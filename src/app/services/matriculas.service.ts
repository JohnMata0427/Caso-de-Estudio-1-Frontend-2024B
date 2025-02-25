import { environment } from '@/environments/environment';
import { Estudiante } from '@/interfaces/estudiante.interface';
import { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

interface ResponseMatriculaById {
  matricula: Matricula;
  estudiante: Estudiante;
  materia: Materia;
}
@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private _backendUrl: string = environment.backendUrl + '/matriculas';
  private _http: HttpClient = inject(HttpClient);
  private matriculas = signal<Matricula[]>([]);

  public getAll(): Observable<Matricula[]> {
    if (this.matriculas().length) {
      return of(this.matriculas());
    }

    return this._http
      .get<Matricula[]>(this._backendUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((matriculas) => this.matriculas.set(matriculas)));
  }

  public getById(id: number): Observable<ResponseMatriculaById> {
    return this._http.get<ResponseMatriculaById>(`${this._backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public create(matricula: Matricula): Observable<Matricula> {
    return this._http
      .post<Matricula>(this._backendUrl, matricula, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((matricula) => {
          this.matriculas.update((state) => [...state, matricula]);
        }),
      );
  }

  public update(
    id: number,
    matricula: Partial<Matricula>,
  ): Observable<Matricula> {
    return this._http
      .put<Matricula>(`${this._backendUrl}/${id}`, matricula, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((matricula) => {
          const index = this.matriculas().findIndex((m) => m.id === id);
          this.matriculas.update((state) => {
            state[index] = matricula;
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
          const index = this.matriculas().findIndex((m) => m.id === id);
          this.matriculas.update((state) => {
            state.splice(index, 1);
            return state;
          });
        }),
      );
  }
}
