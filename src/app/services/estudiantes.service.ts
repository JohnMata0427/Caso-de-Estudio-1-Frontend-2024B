import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante.interface';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private backendUrl: string = environment.backendUrl + '/estudiantes';
  private http: HttpClient = inject(HttpClient);
  private estudiantes: Estudiante[] = [];

  public getAll(): Observable<Estudiante[]> {
    if (this.estudiantes.length) {
      return of(this.estudiantes);
    }

    return this.http.get<Estudiante[]>(this.backendUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).pipe(
      tap((estudiantes) => this.estudiantes = estudiantes)
    )
  }

  public getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public createEstudiante(materia: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.backendUrl, materia, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public updateEstudiante(
    id: number,
    materia: Partial<Estudiante>,
  ): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.backendUrl}/${id}`, materia, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
