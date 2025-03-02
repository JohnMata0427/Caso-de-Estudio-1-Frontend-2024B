import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './guards/auth.guard';
import { EstudiantesByIdAdminPage } from './pages/admin/estudiantes-by-id.page';
import { EstudiantesAdminPage } from './pages/admin/estudiantes.page';
import { MateriasByIdAdminPage } from './pages/admin/materias-by-id.page';
import { MateriasAdminPage } from './pages/admin/materias.page';
import { MatriculasByIdAdminPage } from './pages/admin/matriculas-by-id.page';
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
      { path: 'estudiantes/:id', component: EstudiantesByIdAdminPage },
      { path: 'materias', component: MateriasAdminPage },
      { path: 'materias/:id', component: MateriasByIdAdminPage },
      { path: 'matriculas', component: MatriculasAdminPage },
      { path: 'matriculas/:id', component: MatriculasByIdAdminPage },
      { path: '**', redirectTo: 'estudiantes', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
