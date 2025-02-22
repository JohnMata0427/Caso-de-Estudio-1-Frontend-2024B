import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';
import { EstudiantesAdminPage } from './pages/admin/estudiantes.page';
import { MateriasAdminPage } from './pages/admin/materias.page';
import { MatriculasAdminPage } from './pages/admin/matriculas.page';
import { LoginPage } from './pages/auth/login.page';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginPage },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
    canActivate: [NoAuthGuard],
  },
  {
    path: 'admin',
    children: [
      { path: 'estudiantes', component: EstudiantesAdminPage },
      { path: 'materias', component: MateriasAdminPage },
      { path: 'matriculas', component: MatriculasAdminPage },
      { path: '**', redirectTo: 'estudiantes', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
