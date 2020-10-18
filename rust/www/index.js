import { RK4Integrator } from 'ode-test/mylib';
import { memory } from 'ode-test/mylib_bg';

const startBenchmark = () => {
    let value;
    
    const nSteps = +document.getElementById('nsteps_input').value;
    const nRepeat = +document.getElementById('nrepeat_input').value;
    const tFinal = +document.getElementById('tfinal_input').value;
    const start = performance.now();
    for (let i = 0; i < nRepeat; i++) {
        const integrator = RK4Integrator.new(0.0, 1.0, tFinal, nSteps);
        integrator.integrate_exp();
        const resultPointer = integrator.get_results();
        value = new Float64Array(
            memory.buffer,
            resultPointer,
            nSteps + 1
        );
    }
    const end = performance.now();
    console.log(end - start);
    console.log(value);

    const expectedResult = Math.exp(-tFinal);

    document.getElementById('result').innerHTML = value[nSteps];
    document.getElementById('expected').innerHTML = expectedResult;
    document.getElementById('diff').innerHTML = value[nSteps] - expectedResult;
}

window.startBenchmark = startBenchmark;