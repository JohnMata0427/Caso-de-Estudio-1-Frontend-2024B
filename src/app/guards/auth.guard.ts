import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticated) return true;

  return inject(Router).createUrlTree(['/auth/login']);
};

export const NoAuthGuard: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticated)
    return inject(Router).createUrlTree(['/admin/materias']);

  return true;
};
