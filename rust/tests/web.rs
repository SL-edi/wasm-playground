//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;
extern crate mylib;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
pub fn test_int_exp() {
    let mut integrator = mylib::RK4Integrator::new(0.0, 1.0, 1.0, 1_000_000);
    integrator.integrate_exp();
    let result = integrator.get_result();
    let estimated = result.last().unwrap();
    let exact = (-1.0_f64).exp();
    assert!((estimated - exact).abs() < 1e-3);
}
