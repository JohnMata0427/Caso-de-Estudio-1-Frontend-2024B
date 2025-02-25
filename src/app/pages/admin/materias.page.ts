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
        />
      </div>
      <table-component
        title="materias"
        [data]="materias()"
        [loading]="loading()"
        [form]="form"
        [service]="materiasService"
      />
    </admin-layout>
  `,
})
export class MateriasAdminPage {
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
  protected materiasService: MateriasService = inject(MateriasService);
  public openForm = signal<boolean>(false);
  public loading = signal<boolean>(true);
  public materias = signal<Materia[]>([]);

  constructor() {
    this.materiasService
      .getAll()
      .subscribe({ next: (materias) => this.materias.set(materias) })
      .add(() => this.loading.set(false));
  }
}
