import { BACKEND_URL, headers } from '@/environments/environment';
import { Estudiante } from '@/interfaces/estudiante.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl: string = `${BACKEND_URL}/estudiantes`;
  private estudiantes: Estudiante[] = [];

  public getAll(): Observable<Estudiante[]> {
    if (this.estudiantes.length) return of(this.estudiantes);

    return this._http.get<Estudiante[]>(this._backendUrl, { headers }).pipe(
      tap(estudiantes => {
        this.estudiantes = estudiantes;
      }),
    );
  }

  public create(estudiante: Estudiante): Observable<Estudiante> {
    return this._http.post<Estudiante>(this._backendUrl, estudiante, {
      headers,
    });
  }

  public update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this._http.put<Estudiante>(`${this._backendUrl}/${id}`, estudiante, {
      headers,
    });
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._backendUrl}/${id}`, { headers });
  }
}
