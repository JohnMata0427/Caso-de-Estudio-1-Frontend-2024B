import { environment } from '@/environments/environment';
import { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

interface ResponseMateriaById {
  materia: Materia;
  matriculas: Matricula[];
}
@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private _http: HttpClient = inject(HttpClient);
  private _backendUrl = signal<string>(`${environment.backendUrl}/materias`).asReadonly();
  private _headers = signal({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).asReadonly();

  public getAll(): Observable<Materia[]> {
    return this._http.get<Materia[]>(this._backendUrl(), this._headers());
  }

  public getById(id: number): Observable<ResponseMateriaById> {
    return this._http.get<ResponseMateriaById>(
      `${this._backendUrl()}/${id}`,
      this._headers(),
    );
  }

  public create(materia: Materia): Observable<Materia> {
    return this._http.post<Materia>(
      this._backendUrl(),
      materia,
      this._headers(),
    );
  }

  public update(id: number, materia: Partial<Materia>): Observable<Materia> {
    return this._http.put<Materia>(
      `${this._backendUrl()}/${id}`,
      materia,
      this._headers(),
    );
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(
      `${this._backendUrl()}/${id}`,
      this._headers(),
    );
  }
}
