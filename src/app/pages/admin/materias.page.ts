import { Component, inject } from '@angular/core';
import { AdminLayout } from '../../layouts/admin.layout';
import { MateriasService } from '../../services/materias.service';
import { FormularioComponent } from '../../components/formulario.component';
import { Materia } from '../../interfaces/materias.interface';
import { ButtonComponent } from '../../components/button.component';
import { TableComponent } from '../../components/table.component';

@Component({
  selector: 'materias-admin-page',
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
            Crear Materia
          </button-component>
          @if (materia) {
            <formulario-component
              title="materia"
              [data]="materia"
              [(opened)]="openForm"
            />
          }
        </div>
        <table-component [data]="materias" />
      </div>
    </admin-layout>
  `,
})
export class MateriasAdminPage {
  private materiasService: MateriasService = inject(MateriasService);
  public openForm: boolean = false;
  public loading: boolean = true;
  public materias: Materia[] = [];
  public materia!: Materia;

  public ngOnInit(): void {
    this.materiasService
      .getAll()
      .subscribe({
        next: (materias) => (this.materias = materias),
        error: (error) => console.error(error),
      })
      .add(() => (this.loading = false));

    this.materiasService.getById(1).subscribe((materia) => {
      this.materia = materia;
      this.loading = false;
    });
  }
}
