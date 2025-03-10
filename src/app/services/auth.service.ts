import { environment } from '@/environments/environment';
import { Usuario } from '@/interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface Response {
  token: string;
  response: string;
  usuario: Partial<Omit<Usuario, 'password' | 'id'>>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl = signal<string>(environment.backendUrl).asReadonly();
  public _usuario = signal<Partial<Usuario>>({});

  public login(
    usuario: Partial<Usuario>,
  ): Observable<Omit<Response, 'usuario'>> {
    return this._http
      .post<
        Omit<Response, 'usuario'>
      >(`${this._backendUrl()}/auth/login`, usuario)
      .pipe(tap(({ token }) => localStorage.setItem('token', token)));
  }

  public profile(): Observable<Omit<Response, 'token'>> {
    if (this._usuario().nombre)
      return of({ response: 'Usuario en caché', usuario: this._usuario() });

    return this._http
      .get<Omit<Response, 'token'>>(`${this._backendUrl()}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap(({ usuario }) => this._usuario.set(usuario)));
  }
}
