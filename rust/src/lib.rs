mod utils;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn integrate_exp(t0: f64, y0: f64, t_final: f64, n_steps: usize) -> f64 {
    let dt = (t_final - t0)/(n_steps as f64);
    let mut current_y = y0;
    let mut current_t = t0;
    for _ in 0..n_steps {
        current_y = rk4_step(current_t, dt, current_y, |_,y|{-y});
        current_t += dt;
    }
    current_y
}

fn rk4_step(t: f64, dt: f64, y0: f64, f: impl Fn(f64, f64) -> f64) -> f64 {
    let k1 = f(t, y0);
    let k2 = f(t + 0.5*dt, y0 + 0.5*dt*k1);
    let k3 = f(t + 0.5*dt, y0 + 0.5*dt*k2);
    let k4 = f(t + dt, y0 + dt*k3);
    y0 + dt/6.0*(k1 + 2.0*k2 + 2.0*k3 + k4)
}