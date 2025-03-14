import { ButtonComponent } from '@/components/button.component';
import { FormularioComponent } from '@/components/formulario.component';
import { TableComponent } from '@/components/table.component';
import { BACKEND_URL, headers } from '@/environments/environment';
import type { Estudiante } from '@/interfaces/estudiante.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { EstudiantesService } from '@/services/estudiantes.service';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'estudiantes-admin-page',
  imports: [AdminLayout, FormularioComponent, ButtonComponent, TableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <admin-layout class="flex flex-col min-h-dvh">
      <div class="flex">
        <button-component
          moreStyles="py-1 px-2 text-sm flex gap-x-1"
          (click)="openForm.set(true)"
        >
          <!-- Create Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-stone-100 size-5"
            viewBox="0 0 24 24"
          >
            <path d="M13 4v7h7v2h-7v7h-2v-7H4v-2h7V4z" />
          </svg>
          Crear estudiante
        </button-component>
        <formulario-component
          action="Registrar"
          title="estudiantes"
          [form]="form()"
          [service]="estudiantesService"
          [(opened)]="openForm"
          (onComplete)="onCreate($event)"
        />
      </div>
      <table-component
        title="estudiantes"
        [data]="estudiantesResource.value()"
        [loading]="estudiantesResource.isLoading()"
        [form]="form()"
        [service]="estudiantesService"
        (onDelete)="onDelete($event)"
      />
    </admin-layout>
  `,
})
export class EstudiantesAdminPage {
  protected estudiantesService: EstudiantesService = inject(EstudiantesService);
  public form = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl<string>('', Validators.required),
      apellido: new FormControl<string>('', Validators.required),
      cedula: new FormControl<string>('', Validators.required),
      fecha_nacimiento: new FormControl<string>('', Validators.required),
      ciudad: new FormControl<string>('', Validators.required),
      direccion: new FormControl<string>('', Validators.required),
      telefono: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', Validators.required),
    }),
  ).asReadonly();
  public openForm = signal<boolean>(false);
  public estudiantesResource = httpResource<Estudiante[]>(
    () => ({
      url: `${BACKEND_URL}/estudiantes`,
      headers,
    }),
    {
      defaultValue: [],
    },
  );

  public onCreate(data: Estudiante) {
    this.estudiantesResource.update(estudiantes => estudiantes.concat(data));
  }

  public onDelete(id: number) {
    this.estudiantesResource.update(estudiantes =>
      estudiantes.filter(estudiante => estudiante.id !== id),
    );
  }
}
