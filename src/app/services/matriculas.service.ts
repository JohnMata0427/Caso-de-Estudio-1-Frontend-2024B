import { environment } from '@/environments/environment';
import { Estudiante } from '@/interfaces/estudiante.interface';
import { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

interface ResponseMatriculaById {
  matricula: Matricula;
  estudiante: Estudiante;
  materia: Materia;
}
@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl = signal<string>(`${environment.backendUrl}/matriculas`);
  private _headers = signal({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  public getAll(): Observable<Matricula[]> {
    return this._http.get<Matricula[]>(this._backendUrl(), this._headers());
  }

  public getById(id: number): Observable<ResponseMatriculaById> {
    return this._http.get<ResponseMatriculaById>(
      `${this._backendUrl()}/${id}`,
      this._headers(),
    );
  }

  public create(matricula: Matricula): Observable<Matricula> {
    return this._http.post<Matricula>(
      this._backendUrl(),
      matricula,
      this._headers(),
    );
  }

  public update(
    id: number,
    matricula: Partial<Matricula>,
  ): Observable<Matricula> {
    return this._http.put<Matricula>(
      `${this._backendUrl()}/${id}`,
      matricula,
      this._headers(),
    );
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(
      `${this._backendUrl()}/${id}`,
      this._headers(),
    );
  }
}
