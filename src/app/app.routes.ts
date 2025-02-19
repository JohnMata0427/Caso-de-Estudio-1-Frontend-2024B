import { Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login.page';
import { MateriasAdminPage } from './pages/admin/materias.page';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';
import { EstudiantesAdminPage } from './pages/admin/estudiantes.page';
import { MatriculasAdminPage } from './pages/admin/matriculas.page';
import { AdminLayout } from './layouts/admin.layout';

export const routes: Routes = [
  {
    path: 'auth',
    children: [{ path: 'login', component: LoginPage }],
    canActivate: [NoAuthGuard],
  },
  {
    path: 'admin',
    children: [
      { path: 'materias', component: MateriasAdminPage },
      { path: 'estudiantes', component: EstudiantesAdminPage },
      { path: 'matriculas', component: MatriculasAdminPage },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
