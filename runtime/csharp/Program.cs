using System.Globalization;
using System.Reflection;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Text.Json;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace StepLearn.CSharp;

public static partial class CompilerBridge
{
    private static readonly List<MetadataReference> References = [];
    private const int SourceLimit = 32_000;
    private const int OutputLimit = 16_000;

    public static void Main() { }

    [JSExport]
    public static void AddReference(byte[] bytes) => References.Add(MetadataReference.CreateFromImage(bytes));

    [JSExport]
    public static async Task<string> Run(string requestJson)
    {
        var request = JsonSerializer.Deserialize<Request>(requestJson)!;
        if (request.Source.Length > SourceLimit || request.Input.Length > SourceLimit)
            return JsonSerializer.Serialize(new { ok = false, kind = "limit", message = "الكود أو المدخلات أطول من حدود التجربة." });

        var options = new CSharpParseOptions(LanguageVersion.CSharp14);
        var tree = CSharpSyntaxTree.ParseText(request.Source, options, "Program.cs", Encoding.UTF8);
        // Same implicit imports as the standard console template. User line numbers stay unchanged.
        var imports = CSharpSyntaxTree.ParseText("global using System; global using System.Collections.Generic; global using System.Linq; global using System.Threading.Tasks;", options, "GlobalUsings.g.cs");
        var compilation = CSharpCompilation.Create("Student_" + Guid.NewGuid().ToString("N"), [tree, imports], References,
            new CSharpCompilationOptions(OutputKind.ConsoleApplication, optimizationLevel: OptimizationLevel.Debug, allowUnsafe: false, nullableContextOptions: NullableContextOptions.Enable));
        // Report against the original source before input adaptation, preserving
        // both line and column even when several statements share one line.
        var originalDiagnostics = compilation.GetDiagnostics();
        if (originalDiagnostics.Any(d => d.Severity == DiagnosticSeverity.Error))
            return JsonSerializer.Serialize(new { ok = false, kind = "compile", diagnostics = FormatDiagnostics(originalDiagnostics) });
        // Browser .NET has no stdin handle. Redirect only symbol-resolved Console.Read/ReadLine
        // to a pre-supplied StringReader, without changing user line numbers or named lookalikes.
        var inputType = "Input_" + Guid.NewGuid().ToString("N");
        var rewritten = new InputRewriter(compilation.GetSemanticModel(tree), inputType).Visit(tree.GetRoot())!;
        tree = CSharpSyntaxTree.Create((CSharpSyntaxNode)rewritten, options, "Program.cs", Encoding.UTF8);
        var inputTree = CSharpSyntaxTree.ParseText("internal static class " + inputType + " { private static readonly System.IO.StringReader Reader = new(" + JsonSerializer.Serialize(request.Input) + "); public static string? ReadLine() => Reader.ReadLine(); public static int Read() => Reader.Read(); }", options, "InputBridge.g.cs");
        compilation = compilation.RemoveAllSyntaxTrees().AddSyntaxTrees(tree, imports, inputTree);
        using var image = new MemoryStream();
        var emitted = compilation.Emit(image);
        var diagnostics = FormatDiagnostics(emitted.Success ? originalDiagnostics : emitted.Diagnostics);
        if (!emitted.Success) return JsonSerializer.Serialize(new { ok = false, kind = "compile", diagnostics });

        var output = new BoundedWriter(OutputLimit);
        var originalOut = Console.Out;
        var originalError = Console.Error;
        try
        {
            Console.SetOut(output); Console.SetError(output);
            var assembly = Assembly.Load(image.ToArray());
            var entry = assembly.EntryPoint!;
            var result = entry.Invoke(null, entry.GetParameters().Length == 0 ? null : new object[] { Array.Empty<string>() });
            if (result is Task pending) await pending;
            return JsonSerializer.Serialize(new { ok = true, kind = "success", output = output.ToString(), diagnostics });
        }
        catch (Exception error)
        {
            while (error is TargetInvocationException && error.InnerException is not null) error = error.InnerException;
            return JsonSerializer.Serialize(new { ok = false, kind = error is OutputLimitException ? "limit" : "runtime", output = output.ToString(), message = error.Message, exceptionType = error.GetType().Name, diagnostics });
        }
        finally { Console.SetOut(originalOut); Console.SetError(originalError); }
    }

    private static object[] FormatDiagnostics(IEnumerable<Diagnostic> diagnostics) => diagnostics
        .Where(d => d.Severity is DiagnosticSeverity.Error or DiagnosticSeverity.Warning).Take(20).Select(d =>
        {
            var span = d.Location.GetMappedLineSpan();
            return (object)new { id = d.Id, severity = d.Severity.ToString().ToLowerInvariant(), message = d.GetMessage(CultureInfo.InvariantCulture), line = span.StartLinePosition.Line + 1, column = span.StartLinePosition.Character + 1 };
        }).ToArray();

    private sealed record Request(string Source, string Input);
    private sealed class InputRewriter(SemanticModel model, string typeName) : CSharpSyntaxRewriter
    {
        public override SyntaxNode? VisitInvocationExpression(InvocationExpressionSyntax node)
        {
            if (model.GetSymbolInfo(node).Symbol is IMethodSymbol method && method.ContainingType.ToDisplayString() == "System.Console" && method.Name is "ReadLine" or "Read" && node.ArgumentList.Arguments.Count == 0)
                return node.WithExpression(SyntaxFactory.ParseExpression("global::" + typeName + "." + method.Name)).WithTriviaFrom(node);
            return base.VisitInvocationExpression(node);
        }
    }
    private sealed class OutputLimitException : Exception { public OutputLimitException() : base("تجاوزت المخرجات حد 16000 حرف. قلّل الطباعة أو أوقف الحلقة.") { } }
    private sealed class BoundedWriter(int limit) : TextWriter
    {
        private readonly StringBuilder Text = new();
        public override Encoding Encoding => Encoding.UTF8;
        public override void Write(char value) { if (Text.Length >= limit) throw new OutputLimitException(); Text.Append(value); }
        public override void Write(string? value) { if (value is null) return; if (Text.Length + value.Length > limit) throw new OutputLimitException(); Text.Append(value); }
        public override void WriteLine(string? value) { Write(value); Write('\n'); }
        public override void WriteLine() => Write('\n');
        public override string ToString() => Text.ToString();
    }
}
