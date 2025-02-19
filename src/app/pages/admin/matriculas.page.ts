import { Component, inject } from '@angular/core';
import { AdminLayout } from '../../layouts/admin.layout';
import { ButtonComponent } from '../../components/button.component';
import { FormularioComponent } from '../../components/formulario.component';
import { TableComponent } from '../../components/table.component';
import { Matricula } from '../../interfaces/matricula.interface';
import { MatriculasService } from '../../services/matriculas.service';

@Component({
  selector: 'matriculas-admin-page',
  imports: [AdminLayout, ButtonComponent, FormularioComponent, TableComponent],
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
          @if (matricula) {
            <formulario-component
              title="materia"
              [data]="matricula"
              [(opened)]="openForm"
            />
          }
        </div>
        <table-component [data]="matriculas" />
      </div>
    </admin-layout>
  `,
})
export class MatriculasAdminPage {
  private materiasService: MatriculasService = inject(MatriculasService);
  public loading: boolean = true;
  public openForm: boolean = false;
  public matriculas: Matricula[] = [];
  public matricula!: Matricula;

  public ngOnInit(): void {
    this.materiasService
      .getAll()
      .subscribe({
        next: (matriculas) => (this.matriculas = matriculas),
        error: (error) => console.error(error),
      })
      .add(() => {
        this.loading = false;
      });

    this.materiasService.getById(1).subscribe((matricula) => {
      this.matricula = matricula;
      this.loading = false;
    });
  }
}
