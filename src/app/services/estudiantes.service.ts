import { environment } from '@/environments/environment';
import { Estudiante } from '@/interfaces/estudiante.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface ResponseEstudianteById {
  estudiante: Estudiante;
  matriculas: Matricula[];
}

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

    return this.http
      .get<Estudiante[]>(this.backendUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((estudiantes) => (this.estudiantes = estudiantes)));
  }

  public getById(id: number): Observable<ResponseEstudianteById> {
    return this.http.get<ResponseEstudianteById>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public create(materia: Estudiante): Observable<Estudiante> {
    return this.http
      .post<Estudiante>(this.backendUrl, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((estudiante) => this.estudiantes.push(estudiante)));
  }

  public update(
    id: number,
    materia: Partial<Estudiante>,
  ): Observable<Estudiante> {
    return this.http
      .put<Estudiante>(`${this.backendUrl}/${id}`, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((estudiante) => {
          const index = this.estudiantes.findIndex((e) => e.id === id);
          this.estudiantes[index] = estudiante;
        }),
      );
  }

  public delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.backendUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap(() => {
          const index = this.estudiantes.findIndex((e) => e.id === id);
          this.estudiantes.splice(index, 1);
        }),
      );
  }
}
