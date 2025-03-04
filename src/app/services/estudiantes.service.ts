import { environment } from '@/environments/environment';
import { Estudiante } from '@/interfaces/estudiante.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

interface ResponseEstudianteById {
  estudiante: Estudiante;
  matriculas: Matricula[];
}

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl = signal<string>(`${environment.backendUrl}/estudiantes`).asReadonly();
  private _headers = signal({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).asReadonly();

  public getAll(): Observable<Estudiante[]> {
    return this._http.get<Estudiante[]>(this._backendUrl(), this._headers());
  }

  public getById(id: number): Observable<ResponseEstudianteById> {
    return this._http.get<ResponseEstudianteById>(
      `${this._backendUrl()}/${id}`,
      this._headers(),
    );
  }

  public create(materia: Estudiante): Observable<Estudiante> {
    return this._http.post<Estudiante>(
      this._backendUrl(),
      materia,
      this._headers(),
    );
  }

  public update(
    id: number,
    materia: Partial<Estudiante>,
  ): Observable<Estudiante> {
    return this._http.put<Estudiante>(
      `${this._backendUrl()}/${id}`,
      materia,
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
