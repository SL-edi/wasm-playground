#ifndef RK4_INT_H
#define RK4_INT_H
double rk4_step(double t, double y, double dt, double (*f)(double, double));
double exp_function(double t, double y);
double integrate_exp(double t0, double y0, double t_final, long n_steps);
#endif
