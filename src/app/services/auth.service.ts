import { BACKEND_URL, headers } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

interface Usuario {
  nombre?: string;
  apellido?: string;
  email?: string;
}

interface ProfileResponse {
  response: string;
  usuario: Usuario;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  response: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private backendUrl: string = `${BACKEND_URL}/auth`;
  public usuario: Usuario = {};

  public login(usuario: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.backendUrl}/login`, usuario)
      .pipe(tap(({ token }) => localStorage.setItem('token', token)));
  }

  public profile() {
    if (this.usuario.nombre)
      return of<ProfileResponse>({
        response: 'Usuario en caché',
        usuario: this.usuario,
      });

    return this.http
      .get<ProfileResponse>(`${this.backendUrl}/profile`, { headers })
      .pipe(tap(({ usuario }) => (this.usuario = usuario)));
  }
}
