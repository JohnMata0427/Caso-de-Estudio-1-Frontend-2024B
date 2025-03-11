import { BACKEND_URL, headers } from '@/environments/environment';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl: string = `${BACKEND_URL}/matriculas`;
  private matriculas: Matricula[] = [];

  public getAll(): Observable<Matricula[]> {
    if (this.matriculas.length) return of(this.matriculas);

    return this._http.get<Matricula[]>(this._backendUrl, { headers }).pipe(
      tap(matriculas => {
        this.matriculas = matriculas;
      }),
    );
  }

  public create(matricula: Matricula): Observable<Matricula> {
    return this._http.post<Matricula>(this._backendUrl, matricula, { headers });
  }

  public update(id: number, matricula: Matricula): Observable<Matricula> {
    return this._http.put<Matricula>(`${this._backendUrl}/${id}`, matricula, {
      headers,
    });
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._backendUrl}/${id}`, { headers });
  }
}
