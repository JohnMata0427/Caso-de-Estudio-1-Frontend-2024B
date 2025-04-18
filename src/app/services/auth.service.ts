import { BACKEND_URL, headers, IS_GUEST } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

interface Usuario {
  nombre?: string;
  apellido?: string;
  email?: string;
}

interface LoginResponse {
  response: string;
  token: string;
}

interface ProfileResponse {
  response: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private backendUrl: string = `${BACKEND_URL}/auth`;
  public usuario: Usuario = {};

  public login(usuario: { email: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${this.backendUrl}/login`, usuario)
      .pipe(tap(({ token }) => localStorage.setItem('token', token)));
  }

  public profile() {
    if (IS_GUEST)
      return of<ProfileResponse>({
        response: 'Usuario invitado',
        usuario: { nombre: 'Invitado', email: 'invitado@sistema.com' },
      });
    else if (this.usuario.nombre)
      return of<ProfileResponse>({
        response: 'Usuario en caché',
        usuario: this.usuario,
      });

    return this.http
      .get<ProfileResponse>(`${this.backendUrl}/profile`, { headers })
      .pipe(tap(({ usuario }) => (this.usuario = usuario)));
  }
}
