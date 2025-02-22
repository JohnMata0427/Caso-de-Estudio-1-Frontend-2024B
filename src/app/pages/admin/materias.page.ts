import { ButtonComponent } from '@/components/button.component';
import { FormularioComponent } from '@/components/formulario.component';
import { TableComponent } from '@/components/table.component';
import { Materia } from '@/interfaces/materias.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { MateriasService } from '@/services/materias.service';
import { Component, inject } from '@angular/core';
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
            <!-- Create Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-stone-100 size-5"
              viewBox="0 -960 960 960"
            >
              <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72z" />
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
        <table-component
          title="materias"
          [data]="materias"
          [loading]="loading"
          [form]="form"
          [service]="materiasService"
        />
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
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    codigo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    creditos: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
  });

  public ngOnInit(): void {
    this.materiasService
      .getAll()
      .subscribe({
        next: (materias) => (this.materias = materias),
        error: (error) => console.error(error),
      })
      .add(() => (this.loading = false));
  }
}
