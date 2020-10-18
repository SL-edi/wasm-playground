import rk4 from 'ode-rk4';

const deriv = (t, y) => -y;

const integrateExp = (t0, y0, tFinal, nSteps) => {
  const dt = (tFinal - t0) / nSteps;
  let yVals = [y0];
  let currentt = t0;
  for (let i = 0; i < nSteps; i++) {
    yVals.push(rk4Step(currentt, yVals[i], dt, deriv));
    currentt += dt;
  }
  return yVals;
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

  const t0 = 0;
  const y0 = 1;
  const nSteps = +document.getElementById('nsteps_input').value;
  const nRepeat = +document.getElementById('nrepeat_input').value;
  const tFinal = +document.getElementById('tfinal_input').value;

  const start = performance.now();
  //Repeat the calculation many times to get good timing estimates
  for (let i=0; i<nRepeat; i++) {
    result = integrateExp(t0, y0, tFinal, nSteps);
  }
  const end = performance.now()
  console.log(end-start);

  const expectedResult = Math.exp(-tFinal);

  document.getElementById('result').innerHTML = result[nSteps];
  document.getElementById('expected').innerHTML = expectedResult;
  document.getElementById('diff').innerHTML = result[nSteps] - expectedResult;
}

window.startBenchmark = startBenchmark;
