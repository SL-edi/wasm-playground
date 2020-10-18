#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <emscripten/emscripten.h>
#include "rk4_int.h"

EMSCRIPTEN_KEEPALIVE double* integrate_exp(double t0, double y0, double t_final, long n_steps) {
    double dt = (t_final - t0) / n_steps;
    double current_t = t0;
    double *y_vals = malloc(n_steps * sizeof(double));
    y_vals[0] = y0;
    for (int i = 0; i < n_steps; ++i)
    {
        y_vals[i] = rk4_step(current_t, y_vals[i-1], dt, *exp_function);
        current_t += dt;
    }
    return y_vals;
}

double rk4_step(double t, double y, double dt, double (*f)(double, double)) {
    double k1 = f(t, y);
    double k2 = f(t + 0.5*dt, y + 0.5*dt*k1);
    double k3 = f(t + 0.5*dt, y + 0.5*dt*k2);
    double k4 = f(t + dt, y + dt*k3);

    return y + dt * (k1 + 2 * k2 + 2 * k3 + k4) / 6.0;
}

double exp_function(double t, double y) {
    return -y;
}