# C#/.NET browser compiler

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

The native check links the exact `Program.cs` used by WebAssembly and compares lesson solutions and alternate inputs with the educational interpreter, and checks compiler/runtime diagnostics. Its report is `docs/csharp/native-verification.json`. The standard Node suite additionally verifies message filtering, cancellation/recovery state, asset integrity, and learner input persistence.

`tests/browser/csharp-dotnet.html` is a browser QA page in the development checkout. Use `npm run dev` and open the page in a browser that supports the isolated worker. The focused check covers startup, examples from every unit, language features, errors, output limits, blocked network access, isolation from page data, cancellation, and recovery. The full check also compares every solution and alternate input in the curriculum.

## Teaching interpreter

Unit 8 traces local function calls, typed arguments, and returns to the caller. Each call keeps its own parameter and local variables. Function definitions use braces at the program level and functions access their own scopes. The teaching interpreter limits execution to 24 nested calls and 1000 snapshots. Unit 9 adds indexed reads and simple array element assignments, char indexing in strings, and rectangular arrays with Length and GetLength. The interpreter supports arrays of up to 64 elements and zero-initialized allocation for int arrays. Unit 10 adds small public classes, instance fields and methods, a constructor per class, nullable references, and classes with one type parameter. The trace shows educational object identifiers and follows links through up to 64 instances. Each class can have up to 16 fields. Unit 12 models the lesson operations for List, Stack, Queue, LinkedList, Dictionary and HashSet with int, string, bool and char arguments, and supports Array.IndexOf on int arrays. Collection snapshots track values and counts. The interpreter accepts LinkedList additions as statements and supports up to 64 items per collection.

## Runtime architecture

- The learner selects the experimental engine and explicitly presses Run before the runtime downloads. Only the small size manifest is read on engine selection.
- The parent page downloads the fixed public asset inventory, checks byte sizes and SHA-256, and caches verified compiler bytes in memory for the session. There are no external compiler/CDN/API dependencies at runtime.
- A hidden iframe has only `sandbox="allow-scripts"`. It creates a classic Blob worker, loads ES modules from verified in-memory bytes, and transfers assets to it. No `allow-same-origin` is granted.
- The frame/worker CSP restricts scripts to blobs and WebAssembly evaluation and sets `connect-src 'none'`. .NET loads its modules and assembly data via the resource-loader hook. No public CORS rule or learner network proxy is required.
- Code and pre-supplied input travel by checked parent/frame messages; no source is sent to a server. Nonces, event sources, and request IDs reject unrelated replies. Results and diagnostics use text content in the UI.
- Stop/timeout removes the owning iframe; another request can create a fresh one. The client periodically removes the iframe after 12 runs to reclaim dynamically loaded assemblies.

The browser harness verified these controls in Chrome. See `docs/csharp/PROGRESS.md` for the acceptance results. Execution stays in the learner’s browser.

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

## Teaching interpreter through unit 7

The interpreter now covers initialized `int`, `string`, and `bool` variables, arithmetic, comparisons, `!`, `&&`, `||`, and conditional branches. It checks both operand types before execution. The trace records which operands actually ran and distinguishes a skipped operand from a result of `false`. An `else if` chain records each condition it reaches and stops at the first match.

Block-local variables leave scope at the closing brace. Updates to outer variables persist. Earlier snapshots preserve the values, comparisons, skipped lines, and logical evaluations from that step. String concatenation is capped at 16,000 characters. The editor also offers the experimental WebAssembly engine for actual .NET output.

Unit 4 adds `double` and `decimal`, explicit integer conversions, `string.Length`, and calculation snapshots. The division snapshot shows the expression's type separately from the receiving variable's type. The teaching engine uses exact bounded decimal arithmetic for addition, subtraction, multiplication, comparison, and remainder. Decimal division, calculations that require rounding beyond that representation, and casts between `double` and `decimal` can be tried with .NET.

Unit 5 adds pre-supplied console input, nullable text, `??`, and `int.TryParse` with an inline `out int` declaration in a separate `bool` statement. Reversible snapshots show the consumed line, EOF, and the two results of parsing. Each step keeps its own input draft. Grading runs the program with alternate inputs such as a blank line, zero, invalid text, and the boundaries of `int`.

Unit 6 traces every condition check, counter update and return to the `while` header. The interpreter stops after 1,000 snapshots and reports the line to check. Loop grading checks behavior inside the loop as well as the final output.

Unit 7 adds `for` initialization and update snapshots, innermost-loop jumps, nested depth, and `foreach` bindings over short one-dimensional arrays. The interpreter accepts scalar update statements and a single initializer and update in each `for` header. Its array initializer cap is 64 elements.

`npm run curriculum:csharp` writes the unit files and both copies of the combined curriculum. Existing learner saving uses the same lesson IDs, revisions, and draft keys.
