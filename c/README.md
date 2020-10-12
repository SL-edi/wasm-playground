# Prerequisites

- Emscripten compiler, see 
https://emscripten.org/docs/getting_started/index.html

# Compiling

Run
```
emcc rk4_int.c -s WASM=1 -o rk4_int.js -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
```

the WASM=1 flag ensures we're using WebAssembly (as opposed to asm.js), the output file is a `.js` file, meaning the compiler will
produce a `.wasm` and `.js` file, but not `.html`.
`ccall` and `cwrap` are js wrapper functions for the function exported in wasm.

# Serving

Opening the html file directly from the disk won't work, it needs to be served first.
One possibility is to run
```
python -m http.server
```
