import { ButtonComponent } from '@/components/button.component';
import { FormularioComponent } from '@/components/formulario.component';
import { TableComponent } from '@/components/table.component';
import { BACKEND_URL, headers } from '@/environments/environment';
import { Matricula } from '@/interfaces/matricula.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { MatriculasService } from '@/services/matriculas.service';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'matriculas-admin-page',
  imports: [AdminLayout, ButtonComponent, FormularioComponent, TableComponent],
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
        <span>Dashboard de Matriculas</span>
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
          Crear matricula
        </button-component>
        <formulario-component
          action="Registrar"
          title="matriculas"
          [form]="form()"
          [service]="matriculasService"
          [(opened)]="openForm"
        />
      </div>
      <table-component
        title="matriculas"
        [data]="matriculasResource.value()"
        [loading]="matriculasResource.isLoading()"
        [service]="matriculasService"
        [form]="form()"
        (onDelete)="onDelete($event)"
      />
    </admin-layout>
  `,
})
export class MatriculasAdminPage {
  protected matriculasService: MatriculasService = inject(MatriculasService);
  public form = signal<FormGroup>(
    new FormGroup({
      codigo: new FormControl<string>('', Validators.required),
      descripcion: new FormControl<string>('', Validators.required),
      id_estudiante: new FormControl<number | null>(null, Validators.required),
      id_materia: new FormControl<number | null>(null, Validators.required),
    }),
  ).asReadonly();
  public openForm = signal<boolean>(false);
  public loading = signal<boolean>(true);
  public matriculasResource = httpResource<Matricula[]>(
    () => ({
      url: `${BACKEND_URL}/matriculas`,
      headers,
    }),
    {
      defaultValue: [],
    },
  );

  public onCreate(data: Matricula) {
    this.matriculasResource.update(matriculas => matriculas.concat(data));
  }

  public onDelete(id: number) {
    this.matriculasResource.update(matriculas =>
      matriculas?.filter(matricula => matricula.id !== id),
    );
  }
}
