import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Matricula } from '../interfaces/matricula.interface';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private backendUrl: string = environment.backendUrl + '/matriculas';
  private http: HttpClient = inject(HttpClient);
  private matriculas: Matricula[] = [];

  public getAll(): Observable<Matricula[]> {
    if (this.matriculas.length) {
      return of(this.matriculas);
    }

    return this.http.get<Matricula[]>(this.backendUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).pipe(
      tap((matriculas) => this.matriculas = matriculas)
    )
  }

  public getById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public createMatricula(materia: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.backendUrl, materia, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public updateMatricula(
    id: number,
    materia: Partial<Matricula>,
  ): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.backendUrl}/${id}`, materia, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public deleteMatricula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
