import { ButtonComponent } from '@/components/button.component';
import { FormularioComponent } from '@/components/formulario.component';
import { TableComponent } from '@/components/table.component';
import { Materia } from '@/interfaces/materias.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { MateriasService } from '@/services/materias.service';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
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
          [form]="form"
          [service]="materiasService"
          [(opened)]="openForm"
          (onComplete)="onCreate($event)"
        />
      </div>
      <table-component
        title="materias"
        [data]="materiasResource.value() ?? []"
        [loading]="materiasResource.isLoading()"
        [form]="form"
        [service]="materiasService"
        (onDelete)="onDelete($event)"
      />
    </admin-layout>
  `,
})
export class MateriasAdminPage {
  public form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    creditos: new FormControl(1, Validators.required),
  });
  protected materiasService: MateriasService = inject(MateriasService);
  public openForm = signal<boolean>(false);
  public materiasResource = rxResource({
    loader: () => this.materiasService.getAll(),
  });

  public onCreate(data: Materia) {
    this.materiasResource.update((materias) => [...materias!, data]);
  }

  public onDelete(id: number) {
    this.materiasResource.update((materias) =>
      materias?.filter((materia) => materia.id !== id),
    );
  }
}
