import rk4 from 'ode-rk4';

const deriv = (dydt, y, t) => {
  dydt[0] = -y[0];
}

const startBenchmark = () => {

  let result;

  //Repeat the calculation many times to get good timing estimates
  for (let i=0; i<100; i++) {
    const t0 = 0;
    const y0 = [1];
    const tFinal = 1.0;
    const nsteps = 1e6;
    const integrator = rk4(y0, deriv, t0, tFinal/nsteps );
    result = integrator.steps(nsteps).y;
  }

  const expectedResult = Math.exp(-1.0);

  document.getElementById('result').innerHTML = result;
  document.getElementById('expected').innerHTML = expectedResult;
  document.getElementById('diff').innerHTML = result - expectedResult;
}

window.startBenchmark = startBenchmark;
