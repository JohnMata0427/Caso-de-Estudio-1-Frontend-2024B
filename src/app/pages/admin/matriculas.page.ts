import { ButtonComponent } from '@/components/button.component';
import { FormularioComponent } from '@/components/formulario.component';
import { TableComponent } from '@/components/table.component';
import { Matricula } from '@/interfaces/matricula.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { MatriculasService } from '@/services/matriculas.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'matriculas-admin-page',
  imports: [AdminLayout, ButtonComponent, FormularioComponent, TableComponent],
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
            Crear matricula
          </button-component>
          <formulario-component
            title="matriculas"
            [form]="form"
            [service]="matriculasService"
            [(opened)]="openForm"
          />
        </div>
        <table-component
          title="matriculas"
          [data]="matriculas"
          [loading]="loading"
          [service]="matriculasService"
          [form]="form"
        />
      </div>
    </admin-layout>
  `,
})
export class MatriculasAdminPage {
  protected matriculasService: MatriculasService = inject(MatriculasService);
  public loading: boolean = true;
  public openForm: boolean = false;
  public matriculas: Matricula[] = [];
  public form = new FormGroup({
    codigo: new FormControl('', [Validators.required, Validators.minLength(6)]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    id_estudiante: new FormControl(1, [Validators.required, Validators.min(1)]),
    id_materia: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  public ngOnInit(): void {
    this.matriculasService
      .getAll()
      .subscribe({
        next: (matriculas) => (this.matriculas = matriculas),
        error: (error) => console.error(error),
      })
      .add(() => {
        this.loading = false;
      });
  }
}
