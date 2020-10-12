Module.onRuntimeInitialized = () => {
  const integrateExp = Module.cwrap(
    'integrate_exp',
    'number',
    ['number', 'number', 'number', 'number']
  );
  window.startBenchmark = startBenchmark(integrateExp);
}

const startBenchmark = (integrateExp) => () => {

  let result;

  const t0 = 0;
  const y0 = 1;
  const nSteps = +document.getElementById('nsteps_input').value;
  const nRepeat = +document.getElementById('nrepeat_input').value;
  const tFinal = +document.getElementById('tfinal_input').value;
  console.log(nSteps, nRepeat, tFinal);

  const start = performance.now();
  //Repeat the calculation many times to get good timing estimates
  for (let i=0; i<nRepeat; i++) {
    result = integrateExp(t0, y0, tFinal, nSteps);
  }
  const end = performance.now()
  console.log(end-start);

  const expectedResult = Math.exp(-tFinal);

  document.getElementById('result').innerHTML = result;
  document.getElementById('expected').innerHTML = expectedResult;
  document.getElementById('diff').innerHTML = result - expectedResult;
}