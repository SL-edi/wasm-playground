//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;
extern crate ode_test;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
pub fn test_int_exp() {
    let estimated = ode_test::integrate_exp(0.0, 1.0, 1.0, 1_000_000);
    let exact = (-1.0_f64).exp();
    assert!((estimated - exact).abs() < 1e-3);
}
