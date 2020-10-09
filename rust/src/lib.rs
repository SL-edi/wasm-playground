mod utils;

extern crate peroxide;
use peroxide::fuga::*;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn integrate_exp(t0: f64, y0: f64, tfinal: f64, n_steps: usize) -> f64 {
    let init_state = State::<f64>::new(t0, vec!(y0), vec!(-y0));
    let mut solver = ExplicitODE::new(exp_function);
    let dt = (tfinal - t0)/(n_steps as f64);
    solver
        .set_method(ExMethod::RK4)
        .set_initial_condition(init_state)
        .set_step_size(dt)
        .set_times(n_steps);
    solver.integrate().data.pop().unwrap()
}

fn exp_function(state: &mut State<f64>, _: &NoEnv) {
    let y = &state.value;
    let dy = &mut state.deriv;

    dy[0] = -y[0];
}
