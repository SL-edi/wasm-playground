# wasm-playground

A repository to play around with different WebAssembly implementations.

The primary focus is to pick a benchmark, such as solving and ordinary differential equation (useful for covid-visualisation) and compare different WebAssembly implementations to javascript.
For this we can choose some simple ODE with known result, such as e.g. 
dy/dx = -y
with the known exact solution y = exp(-x).

We can compare e.g.
- pure JS
-  C or C++ with gsl (GNU scientific library)
- Rust with e.g. peroxide crate
- others (C# ?)

Each of the above should have a separate README.md file with the instructions on the requirements and how to compile the code.
They should also have and example html file that would run the benchmark.

For the comparison we can look at the following:
- timings
- wasm file size
- memory usage

which can all be accessed using browser's profiling tools.
