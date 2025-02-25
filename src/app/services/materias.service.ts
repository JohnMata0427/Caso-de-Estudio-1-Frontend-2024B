import { environment } from '@/environments/environment';
import { Materia } from '@/interfaces/materias.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private _backendUrl: string = environment.backendUrl + '/materias';
  private _http: HttpClient = inject(HttpClient);
  private materias = signal<Materia[]>([]);

  public getAll(): Observable<Materia[]> {
    if (this.materias().length) {
      return of(this.materias());
    }

    return this._http
      .get<Materia[]>(this._backendUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((materias) => this.materias.set(materias)));
  }

  public getById(id: number): Observable<Materia> {
    return this._http.get<Materia>(`${this._backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public create(materia: Materia): Observable<Materia> {
    return this._http
      .post<Materia>(this._backendUrl, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((materia) => this.materias.update((state) => [...state, materia])),
      );
  }

  public update(id: number, materia: Partial<Materia>): Observable<Materia> {
    return this._http
      .put<Materia>(`${this._backendUrl}/${id}`, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((materia) => {
          const index = this.materias().findIndex((m) => m.id === id);
          this.materias.update((state) => {
            state[index] = materia;
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
          const index = this.materias().findIndex((m) => m.id === id);
          this.materias.update((state) => {
            state.splice(index, 1);
            return state;
          });
        }),
      );
  }
}
