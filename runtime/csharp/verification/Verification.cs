using System.Text.Json;
using System.Text.RegularExpressions;
namespace StepLearn.CSharp;

// Native .NET validation of the exact shared compiler bridge. This does not
// claim to validate WebAssembly loading, iframe CSP, or browser termination.
public static class Verification
{
    private static readonly List<object> Results = [];
    private static string InputLiteral(string type, JsonElement value)
    {
        if (type.EndsWith("[]", StringComparison.Ordinal))
            return "{ " + string.Join(", ", value.EnumerateArray().Select(item => InputLiteral(type[..^2], item))) + " }";
        return type switch
        {
            "double" => value.GetRawText() + "d",
            "decimal" => value.GetString() + "m",
            _ => value.GetRawText()
        };
    }
    private static async Task Check(string name, string source, string expected = "", string input = "", Func<JsonElement,bool>? validate = null)
    {
        try
        {
            using var document = JsonDocument.Parse(await CompilerBridge.Run(JsonSerializer.Serialize(new {Source=source,Input=input})));
            var result = document.RootElement;
            var pass = validate is not null ? validate(result) : result.GetProperty("ok").GetBoolean() && result.GetProperty("output").GetString() == expected;
            Results.Add(new {name,passed=pass,message=pass?null:result.GetRawText()});
        }
        catch(Exception error) { Results.Add(new {name,passed=false,message=error.ToString()}); }
    }
    public static async Task<int> Main(string[] args)
    {
        var root=Path.GetFullPath(args[0]);
        foreach(var file in Directory.GetFiles(Path.Combine(root,"public/csharp-dotnet/refs"),"*.dll")) CompilerBridge.AddReference(await File.ReadAllBytesAsync(file));
        using var data=JsonDocument.Parse(await File.ReadAllTextAsync(Path.Combine(root,"csharp-lessons.json")));
        var expectedOutputs=JsonSerializer.Deserialize<Dictionary<string,string>>(await File.ReadAllTextAsync(args[2]))!;
        foreach(var lesson in data.RootElement.GetProperty("lessons").EnumerateArray())
        {
            foreach(var step in lesson.GetProperty("steps").EnumerateArray().Where(step=>step.TryGetProperty("challenge",out _)))
            {
                var challenge=step.GetProperty("challenge");
                var source=step.GetProperty("solution").GetString()!;
                var name=lesson.GetProperty("id").GetString()+"/"+step.GetProperty("id").GetString();
                var stdin = challenge.TryGetProperty("stdin", out var input) ? input.GetString()! : "";
                await Check(name,source,expectedOutputs[name], stdin);
                if(challenge.TryGetProperty("cases",out var cases)) {var index=0; foreach(var alternative in cases.EnumerateArray())
                {
                    var modified=source;
                    if (alternative.TryGetProperty("inputs", out var replacements))
                        foreach(var value in replacements.EnumerateObject()) modified=Regex.Replace(modified,@"\b((?:int|double|decimal|string\??|bool)(?:\[\])?)\s+"+Regex.Escape(value.Name)+@"\s*=\s*[^;]+;",m=>m.Groups[1].Value+" "+value.Name+" = "+InputLiteral(m.Groups[1].Value, value.Value)+";");
                    var alternateStdin = alternative.TryGetProperty("stdin", out var alternateInput) ? alternateInput.GetString()! : stdin;
                    await Check(name+"/alternate/"+index++,modified,alternative.GetProperty("output").GetString()!, alternateStdin);
                }}
            }
        }
        await Check("for", "int sum=0; for(int i=1;i<=3;i++)sum+=i; Console.WriteLine(sum);", "6\n");
        await Check("method-array", "int Double(int x)=>x*2; int[] values={1,2,3}; Console.WriteLine(Double(values[2]));", "6\n");
        await Check("class-reference", "var a=new Node{Value=7}; var b=a; b.Value=9; Console.WriteLine(a.Value); class Node{public int Value;}", "9\n");
        await Check("generics-linq", "var numbers=new List<int>{2,4};numbers.Add(6);Console.WriteLine(numbers.Sum());", "12\n");
        await Check("readline-arabic", "string? name=Console.ReadLine();int n=int.Parse(Console.ReadLine()!);Console.WriteLine(name);Console.WriteLine(n*2);", "أحمد\n42\n", "أحمد\n21");
        await Check("readline-eof", "Console.WriteLine(Console.ReadLine()??\"EOF\");", "EOF\n");
        await Check("read-character", "Console.WriteLine(Console.Read());Console.WriteLine(Console.Read());", "65\n-1\n", "A");
        await Check("readline-static-import", "using static System.Console; WriteLine(ReadLine());", "static\n", "static");
        await Check("readline-qualified", "System.Console.WriteLine(global::System.Console.ReadLine());", "qualified\n", "qualified");
        await Check("readline-custom-console", "Console.WriteLine(Console.ReadLine());class Console{public static string ReadLine()=>\"custom\";public static void WriteLine(string s)=>System.Console.WriteLine(s);}", "custom\n");
        await Check("async", "await Task.Delay(1);Console.WriteLine(\"async\");", "async\n");
        await Check("reflection", "Console.WriteLine(typeof(int).FullName);", "System.Int32\n");
        await Check("stderr-order", "Console.Write(\"out\");Console.Error.WriteLine(\"err\");", "outerr\n");
        await Check("compiler-line", "// first\nint value=\"text\";", validate:r=>!r.GetProperty("ok").GetBoolean()&&r.GetProperty("diagnostics").EnumerateArray().Any(d=>d.GetProperty("id").GetString()=="CS0029"&&d.GetProperty("line").GetInt32()==2));
        var columnSource="Console.ReadLine(); int value=\"text\";";
        await Check("compiler-original-column", columnSource, validate:r=>r.GetProperty("diagnostics").EnumerateArray().Any(d=>d.GetProperty("id").GetString()=="CS0029"&&d.GetProperty("column").GetInt32()==columnSource.IndexOf("\"text\"",StringComparison.Ordinal)+1));
        await Check("unsafe-disabled", "unsafe { int* p=null; }", validate:r=>!r.GetProperty("ok").GetBoolean()&&r.GetProperty("kind").GetString()=="compile");
        await Check("divide-zero", "int n=0;Console.WriteLine(1/n);", validate:r=>!r.GetProperty("ok").GetBoolean()&&r.GetProperty("exceptionType").GetString()=="DivideByZeroException");
        await Check("division-before-widening", "int n=5; int d=2; double after=n/d; double before=(double)n/d; Console.WriteLine(after); Console.WriteLine(before);", "2\n2.5\n");
        await Check("double-display", "Console.WriteLine(1e-6); Console.WriteLine(1e17); Console.WriteLine(-0.0);", "1E-06\n1E+17\n-0\n");
        await Check("decimal-display", "decimal a=0.10m; decimal b=0.20m; Console.WriteLine(a+b); Console.WriteLine(a+b == 0.3m);", "0.30\nTrue\n");
        await Check("utf16-length", "Console.WriteLine(\"🧮أ\".Length); Console.WriteLine(\"\".Length);", "3\n0\n");
        await Check("output-limit", "for(int i=0;i<20000;i++)Console.Write(\"x\");", validate:r=>!r.GetProperty("ok").GetBoolean()&&r.GetProperty("kind").GetString()=="limit"&&r.GetProperty("output").GetString()!.Length==16000);
        await Check("source-limit", new string(' ',32001), validate:r=>!r.GetProperty("ok").GetBoolean()&&r.GetProperty("kind").GetString()=="limit");
        await Check("recovery", "Console.WriteLine(\"again\");", "again\n");
        var json=JsonSerializer.SerializeToElement(Results);
        var passed=json.EnumerateArray().Count(r=>r.GetProperty("passed").GetBoolean());
        var report=JsonSerializer.Serialize(new {runtime="native-dotnet",scope="Shared CompilerBridge; browser worker NOT verified",passed,failed=Results.Count-passed,results=Results},new JsonSerializerOptions{WriteIndented=true});
        if(args.Length>1)await File.WriteAllTextAsync(args[1],report+"\n");
        Console.WriteLine(report);
        return passed==Results.Count?0:1;
    }
}
