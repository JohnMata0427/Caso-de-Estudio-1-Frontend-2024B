import { ButtonComponent } from '@/components/button.component';
import { FormularioComponent } from '@/components/formulario.component';
import { TableComponent } from '@/components/table.component';
import { BACKEND_URL, headers } from '@/environments/environment';
import { Materia } from '@/interfaces/materias.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { MateriasService } from '@/services/materias.service';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'materias-admin-page',
  imports: [AdminLayout, FormularioComponent, ButtonComponent, TableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <admin-layout class="flex flex-col min-h-dvh">
      <aside class="flex gap-x-2 items-center font-medium text-sm">
        <!-- Dashboard Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-7 fill-stone-800 dark:fill-stone-100"
          viewBox="0 -960 960 960"
        >
          <path
            d="M528-624v-192h288v192zM144-432v-384h288v384zm384 288v-384h288v384zm-384 0v-192h288v192z"
          />
        </svg>
        <span>Dashboard de Materias</span>
      </aside>
      <div class="flex">
        <button-component
          moreStyles="py-1 px-2 text-sm flex gap-x-1"
          (click)="openForm.set(true)"
        >
          <!-- Create Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-stone-100 size-5"
            viewBox="0 -960 960 960"
          >
            <path d="M421-421H206v-118h215v-215h118v215h215v118H539v215H421z" />
          </svg>
          Crear materia
        </button-component>
        <formulario-component
          action="Registrar"
          title="materias"
          [form]="form()"
          [service]="materiasService"
          [(opened)]="openForm"
          (onComplete)="onCreate($event)"
        />
      </div>
      <table-component
        title="materias"
        [data]="materiasResource.value()"
        [loading]="materiasResource.isLoading()"
        [form]="form()"
        [service]="materiasService"
        (onDelete)="onDelete($event)"
      />
    </admin-layout>
  `,
})
export class MateriasAdminPage {
  protected materiasService: MateriasService = inject(MateriasService);
  public form = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl<string>('', Validators.required),
      descripcion: new FormControl<string>('', Validators.required),
      codigo: new FormControl<string>('', Validators.required),
      creditos: new FormControl<number | null>(null, Validators.required),
    }),
  ).asReadonly();
  public openForm = signal<boolean>(false);
  public materiasResource = httpResource<Materia[]>(
    () => ({
      url: `${BACKEND_URL}/materias`,
      headers,
    }),
    {
      defaultValue: [],
    },
  );

  public onCreate(data: Materia) {
    this.materiasResource.update(materias => materias.concat(data));
  }

  public onDelete(id: number) {
    this.materiasResource.update(materias =>
      materias?.filter(materia => materia.id !== id),
    );
  }
}
