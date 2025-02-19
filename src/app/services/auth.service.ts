import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

interface Response {
  token: string;
  response: string;
  usuario: Partial<Omit<Usuario, 'password' | 'id'>>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendUrl: string = environment.backendUrl;
  public usuario: Partial<Usuario> | null = null;
  private http: HttpClient = inject(HttpClient);

  public login(
    email: string,
    password: string,
  ): Observable<Omit<Response, 'usuario'>> {
    return this.http
      .post<Omit<Response, 'usuario'>>(`${this.backendUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(tap(({ token }) => localStorage.setItem('token', token)));
  }

  public profile(): Observable<Omit<Response, 'token'>> {
    if (this.usuario) {
      return of({ response: 'success', usuario: this.usuario });
    }

    return this.http
      .get<Omit<Response, 'token'>>(`${this.backendUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap(({ usuario }) => (this.usuario = usuario)));
  }

  public get isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    return Date.now() < JSON.parse(atob(token.split('.')[1])).exp * 1000;
  }
}
