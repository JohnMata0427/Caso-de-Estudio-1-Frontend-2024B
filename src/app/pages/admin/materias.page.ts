import { Component, inject } from '@angular/core';
import { AdminLayout } from '../../layouts/admin.layout';
import { MateriasService } from '../../services/materias.service';

@Component({
  imports: [AdminLayout],
  template: `
    <admin-layout></admin-layout>
  `,
})
export class MateriasAdminPage {
  private materiasService: MateriasService = inject(MateriasService);

  public ngOnInit(): void {
    this.materiasService.getAll().subscribe({
      next: (materias) => console.log(materias),
      error: (error) => console.error(error),
    });
  }
}
