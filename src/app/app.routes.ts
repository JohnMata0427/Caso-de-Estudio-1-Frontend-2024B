import { Routes } from '@angular/router';
import { LoginPage } from './pages/auth/login.page';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginPage },
    ],
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
