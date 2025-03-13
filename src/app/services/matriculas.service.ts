import type { Matricula } from '@/interfaces/matricula.interface';
import { BACKEND_URL, headers } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private http: HttpClient = inject(HttpClient);
  private backendUrl: string = `${BACKEND_URL}/matriculas`;

  public create(matricula: Matricula) {
    return this.http.post<Matricula>(this.backendUrl, matricula, { headers });
  }

  public update(id: number, matricula: Matricula) {
    return this.http.put<Matricula>(`${this.backendUrl}/${id}`, matricula, {
      headers,
    });
  }

  public delete(id: number) {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, { headers });
  }
}
