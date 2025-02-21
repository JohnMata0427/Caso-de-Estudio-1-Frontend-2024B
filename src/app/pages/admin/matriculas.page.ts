import { Component, inject } from '@angular/core';
import { AdminLayout } from '../../layouts/admin.layout';
import { ButtonComponent } from '../../components/button.component';
import { FormularioComponent } from '../../components/formulario.component';
import { TableComponent } from '../../components/table.component';
import { Matricula } from '../../interfaces/matricula.interface';
import { MatriculasService } from '../../services/matriculas.service';
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-stone-100 size-5"
              viewBox="0 -960 960 960"
            >
              <path
                d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"
              />
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
        <table-component [data]="matriculas" [loading]="loading" />
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
    codigo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    id_estudiante: new FormControl(1, Validators.required),
    id_materia: new FormControl(1, Validators.required),
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

    this.matriculasService.getById(1).subscribe({
      next: (matricula) => {
        this.form.patchValue(matricula);
      },
      error: (error) => console.error(error),
    });
  }
}
