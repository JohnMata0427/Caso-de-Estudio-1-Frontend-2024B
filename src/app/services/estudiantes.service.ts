import { environment } from '@/environments/environment';
import { Estudiante } from '@/interfaces/estudiante.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface ResponseEstudianteById {
  estudiante: Estudiante;
  matriculas: Matricula[];
}

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl: string = environment.backendUrl + '/estudiantes';
  private estudiantes = signal<Estudiante[]>([]);

  public getAll(): Observable<Estudiante[]> {
    if (this.estudiantes().length) {
      return of(this.estudiantes());
    }

    return this._http
      .get<Estudiante[]>(this._backendUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((estudiantes) => this.estudiantes.set(estudiantes)));
  }

  public getById(id: number): Observable<ResponseEstudianteById> {
    return this._http.get<ResponseEstudianteById>(`${this._backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public create(materia: Estudiante): Observable<Estudiante> {
    return this._http
      .post<Estudiante>(this._backendUrl, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((estudiante) =>
          this.estudiantes.update((state) => [...state, estudiante]),
        ),
      );
  }

  public update(
    id: number,
    materia: Partial<Estudiante>,
  ): Observable<Estudiante> {
    return this._http
      .put<Estudiante>(`${this._backendUrl}/${id}`, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((estudiante) => {
          const index = this.estudiantes().findIndex((e) => e.id === id);
          this.estudiantes.update((state) => {
            state[index] = estudiante;
            return state;
          });
        }),
      );
  }

  public delete(id: number): Observable<void> {
    return this._http
      .delete<void>(`${this._backendUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap(() => {
          const index = this.estudiantes().findIndex((e) => e.id === id);
          this.estudiantes.update((state) => {
            state.splice(index, 1);
            return state;
          });
        }),
      );
  }
}
