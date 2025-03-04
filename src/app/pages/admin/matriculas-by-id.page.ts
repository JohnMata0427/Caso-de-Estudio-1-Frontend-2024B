import { TableComponent } from '@/components/table.component';
import { Matricula } from '@/interfaces/matricula.interface';
import { AdminLayout } from '@/layouts/admin.layout';
import { MatriculasService } from '@/services/matriculas.service';
import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'matriculas-by-id-admin-page',
  imports: [AdminLayout, TitleCasePipe, TableComponent],
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
          <path d="m336-96 48-264H192l324-504h72l-36 312h216L408-96z" />
        </svg>
        <h2 class="font-bold">Detalles del Matricula con ID {{ id() }}</h2>
      </aside>
      @if (matriculaResource.isLoading()) {
        <div class="flex gap-x-2 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-indigo-500 size-5 animate-spin opacity-90"
            viewBox="0 -960 960 960"
          >
            <path
              d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480t33-163 89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17 42 17 17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33"
            />
          </svg>
          <p class="text-sm font-medium mt-1">Cargando información...</p>
        </div>
      } @else {
        <article>
          @for (key of keys(); track $index) {
            <p class="text-sm">
              <strong class="font-bold text-indigo-500">
                {{ key.replace('_', ' ') | titlecase }}:
              </strong>
              <span>{{ matriculaResource.value()?.matricula?.[key] }}</span>
            </p>
          }
        </article>
        <aside class="flex gap-x-2 items-center font-medium text-sm">
          <!-- Dashboard Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-7 fill-stone-800 dark:fill-stone-100"
            viewBox="0 -960 960 960"
          >
            <path
              d="m108-517 170-171q12-12 28-17t32-3l71 9q-45 54-82 112t-62 122l-157-52Zm203 67q25-72 67-134t97-114q75-72 168-115t194-27q17 101-27 193T696-480q-52 56-114 99t-135 68L311-450Zm238-101q21 21 51 21t51-21q21-21 21-51t-21-51q-21-21-51-21t-51 21q-21 21-21 51t21 51Zm-34 441-52-157q65-26 123-62t111-82l21 46q5 24-5 46t-28 39L515-110ZM176-331q32-32 78-32t78 31q32 32 30 77t-34 77q-44 47-106 60T96-98q8-63 22-125t58-108Z"
            />
          </svg>
          <h2 class="font-bold">Detalles del Estudiante de la Matricula:</h2>
        </aside>
        <table-component
          title="estudiantes"
          [loading]="false"
          [data]="estudiante()"
          [editable]="false"
        />
        <aside class="flex gap-x-2 items-center font-medium text-sm">
          <!-- Dashboard Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-7 fill-stone-800 dark:fill-stone-100"
            viewBox="0 -960 960 960"
          >
            <path
              d="m660-393 146-125 106 9-172 147 52 218-85-51zm-87-265-43-99 46-107 92 214zM195-144l63-266L48-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141z"
            />
          </svg>
          <h2 class="font-bold">Detalles de la Materia de la Matricula:</h2>
        </aside>
        <table-component
          title="materias"
          [loading]="false"
          [data]="materia()"
          [editable]="false"
        />
      }
    </admin-layout>
  `,
})
export class MatriculasByIdAdminPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matriculasService = inject(MatriculasService);
  public readonly id = computed(
    () => this.activatedRoute.snapshot.params['id'],
  );
  public readonly matriculaResource = rxResource({
    request: () => this.id(),
    loader: ({ request }) => this.matriculasService.getById(request),
  });
  public readonly estudiante = linkedSignal(() => [
    this.matriculaResource.value()?.estudiante!,
  ]);
  public readonly materia = linkedSignal(() => [
    this.matriculaResource.value()?.materia!,
  ]);

  public readonly keys = computed<(keyof Matricula)[]>(() => {
    return Object.keys(this.matriculaResource.value()?.matricula ?? {}).slice(
      1,
      3,
    ) as (keyof Matricula)[];
  });
}
