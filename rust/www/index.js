import * as wasm from 'ode-test';

const startBenchmark = () => {
    let value;
    
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
        value = wasm.integrate_exp(0.0, 1.0, 1.0, 1e6);
    }
    const end = performance.now();
    console.log(end - start);

    const expectedResult = Math.exp(-1.0);

    document.getElementById('result').innerHTML = value;
    document.getElementById('expected').innerHTML = expectedResult;
    document.getElementById('diff').innerHTML = value - expectedResult;
}

window.startBenchmark = startBenchmark;