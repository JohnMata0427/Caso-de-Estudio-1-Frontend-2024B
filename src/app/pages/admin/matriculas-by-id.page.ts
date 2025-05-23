import { TableComponent } from '@/components/table.component';
import { BACKEND_URL, headers } from '@/environments/environment';
import type { Estudiante } from '@/interfaces/estudiante.interface';
import type { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { TitleCasePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

interface ResponseMatriculaById {
  matricula: Matricula;
  estudiante: Estudiante;
  materia: Materia;
}

@Component({
  selector: 'matriculas-by-id-admin-page',
  imports: [AdminLayout, TitleCasePipe, TableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <admin-layout class="flex flex-col min-h-dvh">
      <aside class="flex gap-x-2 items-center font-medium text-sm">
        <!-- Ray Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-6 fill-stone-800 dark:fill-stone-100"
          viewBox="0 0 24 24"
        >
          <path d="M11 15H6l7-14v8h5l-7 14z" />
        </svg>
        <h2 class="font-bold">Detalles del Matricula con ID {{ id() }}</h2>
      </aside>
      @if (matriculaResource.isLoading()) {
        <div class="flex gap-x-2 justify-center items-center">
          <!-- Spinner Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-indigo-500 size-5 animate-spin opacity-90"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2a10 10 0 0 0 0 20v-3a7 7 0 1 1 7-7h3c0-5-5-10-10-10"
            />
          </svg>
          <p class="text-sm font-medium mt-1">Cargando información...</p>
        </div>
      } @else {
        <article class="text-sm">
          @for (key of keys(); track $index) {
            <p>
              <strong class="font-bold text-indigo-500">
                {{ key.replace('_', ' ') | titlecase }}:
              </strong>
              <span>{{ matriculaResource.value().matricula[key] }}</span>
            </p>
          } @empty {
            <p class="text-red-500">No se encontraron datos de la matricula</p>
          }
        </article>
        <aside class="flex gap-x-2 items-center font-medium text-sm">
          <!-- Rocket Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 fill-stone-800 dark:fill-stone-100"
            viewBox="0 0 24 24"
          >
            <path
              d="m2.5 10.6 4.2-4.2q.3-.4.8-.5t1 0l1.3.2Q8.4 7.7 7.6 9t-1.5 3.1zm5 2.2q.7-1.8 1.6-3.4t2.4-3q2.2-2.2 5-3.2t5.3-.7q.5 2.4-.6 5.3t-3.3 5q-1.4 1.4-3 2.4t-3.4 1.6zm7-3q.6.6 1.4.6t1.4-.6.6-1.4-.6-1.4-1.4-.6-1.4.6-.6 1.4.6 1.4m-.7 12-1.6-3.6q1.8-.7 3.1-1.5t3-2.1l.2 1.3v1q-.1.5-.5.8zM4 16q1-.8 2.2-.8t2.1.8.9 2.2-.9 2q-.6.7-2 1.2t-4.1.8q.3-2.6.8-4T4 16"
            />
          </svg>
          <h2 class="font-bold">Detalles del Estudiante de la Matricula:</h2>
        </aside>
        <table-component
          title="estudiantes"
          [loading]="false"
          [data]="[matriculaResource.value().estudiante]"
          [editable]="false"
        />
        <aside class="flex gap-x-2 items-center font-medium text-sm">
          <!-- Lightbulb Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 fill-stone-800 dark:fill-stone-100"
            viewBox="0 0 24 24"
          >
            <path
              d="m22 10-.6-1.4L20 8l1.4-.6L22 6l.6 1.4L24 8l-1.4.6zm-3-4-1-2-2-1 2-1 1-2 1 2 2 1-2 1zM9 22q-.8 0-1.4-.6T7 20h4q0 .8-.6 1.4T9 22m-4-3v-2h8v2zm.3-3q-1.8-1-2.8-2.8t-1-3.7q0-3.1 2.2-5.3T9 2t5.3 2.2 2.2 5.3q0 2-1 3.8T12.7 16z"
            />
          </svg>
          <h2 class="font-bold">Detalles de la Materia de la Matricula:</h2>
        </aside>
        <table-component
          title="materias"
          [loading]="false"
          [data]="[matriculaResource.value().materia]"
          [editable]="false"
        />
      }
    </admin-layout>
  `,
})
export default class MatriculasByIdAdminPage {
  public readonly id = input.required<number>();

  public readonly matriculaResource = httpResource<ResponseMatriculaById>(
    () => ({
      url: `${BACKEND_URL}/matriculas/${this.id()}`,
      headers,
    }),
    {
      defaultValue: {
        estudiante: {} as Estudiante,
        materia: {} as Materia,
        matricula: {} as Matricula,
      },
    },
  );

  public readonly keys = computed<(keyof Matricula)[]>(
    () =>
      Object.keys(this.matriculaResource.value().matricula).slice(
        1,
        3,
      ) as (keyof Matricula)[],
  );
}
