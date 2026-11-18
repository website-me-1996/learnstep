# C#/.NET browser compiler — P2 checkpoint

**Status:** implemented experimentally; browser acceptance is pending. Native compiler tests are passing, but they do not prove WebAssembly startup, CSP enforcement, or actual worker cancellation. Read `docs/csharp/PROGRESS.md` before continuing.

## Build and checks

Normal hosting still uses `npm run build`. Generated compiler assets are committed under `public/csharp-dotnet/`; CI does not need to install .NET.

To rebuild those assets, install the official .NET SDK **10.0.204** (pinned by `global.json`), restore its NuGet packages/reference packs, then run:

```sh
npm run build:csharp-runtime
npm test
npm run test:csharp:dotnet
npm run build
```

`STEPLEARN_DOTNET` can select an absolute `dotnet` executable. If it is outside the normal installation location, also set `DOTNET_ROOT`. The asset build needs `Microsoft.NETCore.App.Ref/10.0.15` and the package versions in the project; it uses the prebuilt native WebAssembly runtime and does not require AOT/native workloads. A task override keeps compatible WebAssembly MSBuild tasks in-process to avoid an MSB4216 task-host startup problem in restricted Linux containers. Revalidate or remove that override when changing SDK/runtime versions.

The native check links the exact `Program.cs` used by WebAssembly and compares all 120 lesson solutions to the educational interpreter, 216 alternate input cases, and 20 compiler/runtime cases. Its report is `docs/csharp/native-verification.json`. The standard Node suite additionally verifies message filtering, cancellation/recovery state, asset integrity, and learner input persistence.

`tests/browser/csharp-dotnet.html` is a manual browser QA page in the development checkout. It is excluded from the production build. Run it in a permitted browser environment, using the project's normal preview. It checks real .NET output, language features, inputs, errors, output limits, manual and timeout cancellation, recovery, and opaque origin. The current cloud preview's URL policy blocked continued blob-context testing; do not bypass that restriction or mark browser QA successful from a native report.

## Runtime architecture

- The learner selects the experimental engine and explicitly presses Run before the runtime downloads. Only the small size manifest is read on engine selection.
- The parent page downloads the fixed public asset inventory, checks byte sizes and SHA-256, and caches verified compiler bytes in memory for the session. There are no external compiler/CDN/API dependencies at runtime.
- A hidden iframe has only `sandbox="allow-scripts"`. It creates a classic Blob worker, loads ES modules from verified in-memory bytes, and transfers assets to it. No `allow-same-origin` is granted.
- The frame/worker CSP restricts scripts to blobs and WebAssembly evaluation and sets `connect-src 'none'`. .NET loads its modules and assembly data via the resource-loader hook. No public CORS rule or learner network proxy is required.
- Code and pre-supplied input travel by checked parent/frame messages; no source is sent to a server. Nonces, event sources, and request IDs reject unrelated replies. Results and diagnostics use text content in the UI.
- Stop/timeout removes the owning iframe; another request can create a fresh one. The client periodically removes the iframe after 12 runs to reclaim dynamically loaded assemblies.

These are implemented controls; their end-to-end browser behavior remains an acceptance item. This is a learner-side experiment, not a server sandbox or a general hostile-code evaluation service.

## Limits and semantics

- C# 14, standard implicit imports (`System`, collections, LINQ, tasks); no downloaded NuGet packages and `unsafe` disabled.
- 32,000 characters of source; 16,000 characters in the input UI; the bridge accepts at most 32,000 input characters. Combined standard output/error is bounded to 16,000 characters.
- Boot/download timeout: 90 seconds. Run timeout: 6 seconds including compilation/execution after boot. This is a time limit, not a hard memory quota. Browser memory allocation can still be expensive.
- `Console.ReadLine()` and `Read()` are adapted by Roslyn semantic symbol resolution to a per-program StringReader. Alias/qualified calls work; a user-defined class named Console is untouched. Inputs are supplied before Run; this is not an interactive terminal. `Console.In`, `SetIn`, `ReadKey`, and arbitrary operating-system APIs are not supplied.
- Diagnostics are collected from original source before input adaptation, preserving line and column. The bridge emits an in-memory console assembly and invokes its entry point, awaiting Task entry points.
- The real engine is separate from the visual interpreter. Completion of authored tasks still checks the intended lesson concepts and alternate cases; arbitrary C# syntax may execute but does not automatically pass an authored exercise.
- Generated assets: about 45.5 MiB raw / 16.9 MiB at gzip; actual transfer size depends on host compression and browser caching. Verified bytes remain in the page's memory during the session. Consider size/memory optimization only after correctness is established.

## Primary references and licenses

- https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-on-webworkers?view=aspnetcore-10.0
- https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/wasm-browser-app?view=aspnetcore-10.0
- https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-versioning
- https://github.com/dotnet/roslyn
- https://github.com/dotnet/sdk/issues/55646

Versions are recorded in the project and generated asset manifest. Upstream licensing and notices are described in `THIRD_PARTY_NOTICES.md` and copied alongside the assets.

## Teaching interpreter through unit 6

The interpreter now covers initialized `int`, `string`, and `bool` variables, arithmetic, comparisons, `!`, `&&`, `||`, and conditional branches. It checks both operand types before execution. The trace records which operands actually ran and distinguishes a skipped operand from a result of `false`. An `else if` chain records each condition it reaches and stops at the first match.

Block-local variables leave scope at the closing brace. Updates to outer variables persist. Earlier snapshots preserve the values, comparisons, skipped lines, and logical evaluations from that step. String concatenation is capped at 16,000 characters. The optional WebAssembly engine awaits separate browser verification.

Unit 4 adds `double` and `decimal`, explicit integer conversions, `string.Length`, and calculation snapshots. The division snapshot shows the expression's type separately from the receiving variable's type. The teaching engine uses exact bounded decimal arithmetic for addition, subtraction, multiplication, comparison, and remainder. Decimal division, calculations that require rounding beyond that representation, and casts between `double` and `decimal` can be tried with .NET.

Unit 5 adds pre-supplied console input, nullable text, `??`, and `int.TryParse` with an inline `out int` declaration in a separate `bool` statement. Reversible snapshots show the consumed line, EOF, and the two results of parsing. Each step keeps its own input draft. Grading runs the program with alternate inputs such as a blank line, zero, invalid text, and the boundaries of `int`.

Unit 6 traces every condition check, counter update and return to the `while` header. The interpreter stops after 1,000 snapshots and reports the line to check. Loop grading checks behavior inside the loop as well as the final output.

`npm run curriculum:csharp` writes the unit files and both copies of the combined curriculum. Existing learner saving uses the same lesson IDs, revisions, and draft keys.
