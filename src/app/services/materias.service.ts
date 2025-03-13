import type { Materia } from '@/interfaces/materias.interface';
import { BACKEND_URL, headers } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private http: HttpClient = inject(HttpClient);
  private backendUrl: string = `${BACKEND_URL}/materias`;

  public create(materia: Materia) {
    return this.http.post<Materia>(this.backendUrl, materia, { headers });
  }

  public update(id: number, materia: Materia) {
    return this.http.put<Materia>(`${this.backendUrl}/${id}`, materia, {
      headers,
    });
  }

  public delete(id: number) {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, { headers });
  }
}
