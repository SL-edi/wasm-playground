mod utils;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct RK4Integrator{
    t0: f64,
    y0: f64,
    t_final: f64,
    n_steps: usize,
    results: Vec<f64>,
}

#[wasm_bindgen]
impl RK4Integrator{
    pub fn new(t0: f64, y0: f64, t_final: f64, n_steps: usize) -> Self {
        RK4Integrator{
            t0,
            y0,
            t_final,
            n_steps,
            results: Vec::new()
        }
    }

    pub fn integrate_exp(&mut self) {
        let dt = (self.t_final - self.t0)/(self.n_steps as f64);
        let mut t = self.t0;
        let mut y = self.y0;
        self.results = vec![y];
        for _ in 0..self.n_steps {
            y = rk4_step(t, dt, y, |_,y| -y);
            self.results.push(y);
            t += dt;
        }
    }

    pub fn get_results(&self) -> *const f64 {
        self.results.as_ptr()
    }

    /*
    pub fn get_result(&self) -> Vec<f64> {
        self.results.clone()
    }*/
}

fn rk4_step(t: f64, dt: f64, y0: f64, f: impl Fn(f64, f64) -> f64) -> f64 {
    let k1 = f(t, y0);
    let k2 = f(t + 0.5*dt, y0 + 0.5*dt*k1);
    let k3 = f(t + 0.5*dt, y0 + 0.5*dt*k2);
    let k4 = f(t + dt, y0 + dt*k3);
    y0 + dt/6.0*(k1 + 2.0*k2 + 2.0*k3 + k4)
}