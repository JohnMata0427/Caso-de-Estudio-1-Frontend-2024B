import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

function isAuthenticated() {
  const guest = localStorage.getItem('guest');
  if (guest) return true;

  const token = localStorage.getItem('token');
  if (!token) return false;

  return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
}

export const AuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return true;

  return inject(Router).createUrlTree(['/auth']);
};

export const NoAuthGuard: CanActivateFn = () => {
  if (isAuthenticated()) return inject(Router).createUrlTree(['/admin']);

  return true;
};
