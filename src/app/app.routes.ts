import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login.page') },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
    canActivate: [NoAuthGuard],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'estudiantes',
        loadComponent: () => import('./pages/admin/estudiantes.page'),
      },
      {
        path: 'estudiantes/:id',
        loadComponent: () => import('./pages/admin/estudiantes-by-id.page'),
      },
      {
        path: 'materias',
        loadComponent: () => import('./pages/admin/materias.page'),
      },
      {
        path: 'materias/:id',
        loadComponent: () => import('./pages/admin/materias-by-id.page'),
      },
      {
        path: 'matriculas',
        loadComponent: () => import('./pages/admin/matriculas.page'),
      },
      {
        path: 'matriculas/:id',
        loadComponent: () => import('./pages/admin/matriculas-by-id.page'),
      },
      { path: '**', redirectTo: 'estudiantes', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
