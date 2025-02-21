import { Component, inject } from '@angular/core';
import { AdminLayout } from '../../layouts/admin.layout';
import { MateriasService } from '../../services/materias.service';
import { FormularioComponent } from '../../components/formulario.component';
import { Materia } from '../../interfaces/materias.interface';
import { ButtonComponent } from '../../components/button.component';
import { TableComponent } from '../../components/table.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'materias-admin-page',
  imports: [AdminLayout, FormularioComponent, ButtonComponent, TableComponent],
  template: `
    <admin-layout class="flex flex-col min-h-screen">
      <div class="flex flex-col gap-y-4 mt-2">
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
            Crear materia
          </button-component>
          <formulario-component
            title="materias"
            [form]="form"
            [service]="materiasService"
            [(opened)]="openForm"
          />
        </div>
        <table-component [data]="materias" [loading]="loading" />
      </div>
    </admin-layout>
  `,
})
export class MateriasAdminPage {
  protected materiasService: MateriasService = inject(MateriasService);
  public openForm: boolean = false;
  public loading: boolean = true;
  public materias: Materia[] = [];
  public form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    creditos: new FormControl(1, Validators.required),
  });

  public ngOnInit(): void {
    this.materiasService
      .getAll()
      .subscribe({
        next: (materias) => (this.materias = materias),
        error: (error) => console.error(error),
      })
      .add(() => (this.loading = false));

    this.materiasService.getById(1).subscribe({
      next: (materia) => this.form.patchValue(materia),
      error: (error) => console.error(error),
    });
  }
}
