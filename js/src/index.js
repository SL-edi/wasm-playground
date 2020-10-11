import rk4 from 'ode-rk4';

const deriv = (t, y) => -y;

const integrateExp = (t0, y0, tFinal, nSteps) => {
  const dt = (tFinal - t0) / nSteps;
  let currenty = y0;
  let currentt = t0;
  for (let i = 0; i < nSteps; i++) {
    currenty = rk4Step(currentt, currenty, dt, deriv);
    currentt += dt;
  }
  return currenty;
}

const rk4Step = (t, y, dt, f) => {
  const k1 = f(t, y);
  const k2 = f(t + 0.5 * dt, y + 0.5 * dt * k1);
  const k3 = f(t + 0.5 * dt, y + 0.5 * dt * k2);
  const k4 = f(t + dt, y + dt * k3);
  return y + (k1 + 2*k2 + 2*k3 + k4) * dt / 6.0;
}

const startBenchmark = () => {

  let result;

  const start = performance.now();
  //Repeat the calculation many times to get good timing estimates
  const t0 = 0;
  const y0 = 1;
  const tFinal = 1.0;
  const nSteps = +document.getElementById('nsteps-input').value;
  for (let i=0; i<1; i++) {
    result = integrateExp(t0, y0, tFinal, nSteps);
  }
  const end = performance.now()
  console.log(end-start);

  const expectedResult = Math.exp(-1.0);

  document.getElementById('result').innerHTML = result;
  document.getElementById('expected').innerHTML = expectedResult;
  document.getElementById('diff').innerHTML = result - expectedResult;
}

window.startBenchmark = startBenchmark;
