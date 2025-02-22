import { environment } from '@/environments/environment';
import { Materia } from '@/interfaces/materias.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private backendUrl: string = environment.backendUrl + '/materias';
  private http: HttpClient = inject(HttpClient);
  private materias: Materia[] = [];

  public getAll(): Observable<Materia[]> {
    if (this.materias.length) {
      return of(this.materias);
    }

    return this.http
      .get<Materia[]>(this.backendUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((materias) => (this.materias = materias)));
  }

  public getById(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public create(materia: Materia): Observable<Materia> {
    return this.http
      .post<Materia>(this.backendUrl, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(tap((materia) => this.materias.push(materia)));
  }

  public update(id: number, materia: Partial<Materia>): Observable<Materia> {
    return this.http
      .put<Materia>(`${this.backendUrl}/${id}`, materia, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap((materia) => {
          const index = this.materias.findIndex((m) => m.id === id);
          this.materias[index] = materia;
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
          const index = this.materias.findIndex((m) => m.id === id);
          this.materias.splice(index, 1);
        }),
      );
  }
}
