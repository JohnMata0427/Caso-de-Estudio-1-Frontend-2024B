import { BACKEND_URL, headers } from '@/environments/environment';
import { Materia } from '@/interfaces/materias.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl: string = `${BACKEND_URL}/materias`;
  private materias: Materia[] = [];

  public getAll(): Observable<Materia[]> {
    if (this.materias.length) return of(this.materias);

    return this._http.get<Materia[]>(this._backendUrl, { headers }).pipe(
      tap(materias => {
        this.materias = materias;
      }),
    );
  }

  public create(materia: Materia): Observable<Materia> {
    return this._http.post<Materia>(this._backendUrl, materia, { headers });
  }

  public update(id: number, materia: Materia): Observable<Materia> {
    return this._http.put<Materia>(`${this._backendUrl}/${id}`, materia, {
      headers,
    });
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._backendUrl}/${id}`, { headers });
  }
}
