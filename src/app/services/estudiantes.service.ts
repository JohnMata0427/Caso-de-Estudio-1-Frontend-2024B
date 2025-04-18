import { BACKEND_URL, headers } from '@/environments/environment';
import type { Estudiante } from '@/interfaces/estudiante.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private http: HttpClient = inject(HttpClient);
  private backendUrl: string = `${BACKEND_URL}/estudiantes`;

  public create(estudiante: Estudiante) {
    return this.http.post<Estudiante>(this.backendUrl, estudiante, {
      headers,
    });
  }

  public update(id: number, estudiante: Estudiante) {
    return this.http.put<Estudiante>(`${this.backendUrl}/${id}`, estudiante, {
      headers,
    });
  }

  public delete(id: number) {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, { headers });
  }
}
