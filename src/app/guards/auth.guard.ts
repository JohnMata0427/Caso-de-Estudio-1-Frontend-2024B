import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return true;

  return inject(Router).createUrlTree(['/auth']);
};

export const NoAuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return inject(Router).createUrlTree(['/admin']);

  return true;
};

function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return Date.now() < decodedToken.exp * 1000;
}
