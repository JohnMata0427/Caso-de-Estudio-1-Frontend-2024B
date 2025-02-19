import { Component, inject } from '@angular/core';
import { AdminLayout } from '../../layouts/admin.layout';
import { EstudiantesService } from '../../services/estudiantes.service';
import { FormularioComponent } from '../../components/formulario.component';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { ButtonComponent } from '../../components/button.component';
import { TableComponent } from '../../components/table.component';

@Component({
  selector: 'estudiantes-admin-page',
  imports: [AdminLayout, FormularioComponent, ButtonComponent, TableComponent],
  template: `
    <admin-layout>
      <div class="flex flex-col gap-y-3 mt-4">
        <div>
          <button-component
            moreStyles="py-1 px-2 text-sm flex gap-x-1"
            (click)="openForm = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-stone-100 size-5"
              viewBox="0 -960 960 960"
            >
              <path
                d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"
              />
            </svg>
            Crear Estudiante
          </button-component>
          @if (materia) {
            <formulario-component
              title="materia"
              [data]="materia"
              [(opened)]="openForm"
            />
          }
        </div>
        <table-component [data]="estudiantes" />
      </div>
    </admin-layout>
  `,
})
export class EstudiantesAdminPage {
  private estudiantesService: EstudiantesService = inject(EstudiantesService);
  public openForm: boolean = false;
  public loading: boolean = true;
  public estudiantes: Estudiante[] = [];
  public materia!: Estudiante;

  public ngOnInit(): void {
    this.estudiantesService
      .getAll()
      .subscribe({
        next: (estudiantes) => (this.estudiantes = estudiantes),
        error: (error) => console.error(error),
      })
      .add(() => (this.loading = false));

    this.estudiantesService.getById(1).subscribe((materia) => {
      this.materia = materia;
      this.loading = false;
    });
  }
}
