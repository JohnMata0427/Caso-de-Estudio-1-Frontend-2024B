import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from '../interfaces/materias.interface';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private backendUrl: string = environment.backendUrl + '/materias';
  private http: HttpClient = inject(HttpClient);

  public getAll(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.backendUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public getById(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public createMateria(materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.backendUrl, materia, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public updateMateria(
    id: number,
    materia: Partial<Materia>,
  ): Observable<Materia> {
    return this.http.put<Materia>(`${this.backendUrl}/${id}`, materia, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public deleteMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
