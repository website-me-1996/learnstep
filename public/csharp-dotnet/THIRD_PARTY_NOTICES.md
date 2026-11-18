# Distributed compiler dependencies

StepLearn's authored curriculum and application remain subject to the repository's own terms. The following upstream runtime/compiler components retain their own licenses. Their generated files live under `public/csharp-dotnet/`.

| Component | Pinned version | License / source |
| --- | --- | --- |
| .NET runtime, reference assemblies, ASP.NET Core browser dependencies | 10.0.15 | MIT; https://github.com/dotnet/runtime and https://github.com/dotnet/aspnetcore |
| Microsoft.CodeAnalysis.CSharp / Microsoft.CodeAnalysis.Common | 5.0.0 | MIT; https://github.com/dotnet/roslyn/tree/6c4a46a31302167b425d5e0a31ea83c9a9aa1d09 |
| .NET SDK used to build the assets | 10.0.204 | MIT; https://github.com/dotnet/sdk |

The package manifests identify Microsoft as copyright holder. The runtime MIT license is shipped as `DOTNET-LICENSE.txt`. Roslyn is also distributed under the MIT license with copyright © Microsoft Corporation. Its full standard license text is below. Upstream third-party notices from the SDK and Roslyn packages are copied by the build script. The WebAssembly application is not trimmed or AOT-compiled, because Roslyn compilation and reflection loading need those capabilities. No source from a sample compiler application has been copied.

## Roslyn MIT license

Copyright (c) Microsoft Corporation. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
