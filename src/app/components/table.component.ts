import { Estudiante } from '@/interfaces/estudiante.interface';
import { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormTitle, FormularioComponent } from './formulario.component';

type TableData = Materia | Estudiante | Matricula;

@Component({
  selector: 'table-component',
  imports: [TitleCasePipe, FormularioComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="flex gap-x-2 justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-indigo-500 size-5 animate-spin opacity-90"
          viewBox="0 -960 960 960">
          <path
            d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480t33-163 89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17 42 17 17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33" />
        </svg>
        <p class="text-sm font-medium mt-1">Cargando información...</p>
      </div>
    } @else {
      @if (editable()) {
        <label class="relative" for="search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="fill-stone-800 dark:fill-stone-100 absolute left-2 size-4 bottom-0">
            <path
              d="M765-144 526-383q-30 22-66 35-36 12-76 12-100 0-170-70t-70-170 70-170 170-70 170 70 70 170q0 40-12 76-13 36-35 66l239 239zM384-408q70 0 119-49t49-119-49-119-119-49-119 49-49 119 49 119 119 49" />
          </svg>
          <input
            type="search"
            id="search"
            name="search"
            class="w-full pl-8 py-2 pr-2 rounded-lg outline-indigo-500 focus:outline-3 text-xs bg-stone-200 border border-stone-300 placeholder:text-stone-500 dark:bg-stone-800 dark:border-stone-700 dark:caret-stone-100 mb-4"
            placeholder="Buscar registros..."
            [(ngModel)]="search" />
        </label>
      }
      @if (filteredData().length === 0) {
        <div class="flex gap-x-2 justify-center items-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-stone-800 dark:fill-stone-100 size-5"
            viewBox="0 -960 960 960">
            <path
              d="M324-168h312v-120q0-65-45-110t-111-46q-65 0-110 46t-46 110zm156-348q65 0 111-45t45-111v-120H324v120q0 65 46 111t110 45M192-96v-72h60v-120q0-59 28-109t78-83q-49-32-77-82t-29-110v-120h-60v-72h576v72h-60v120q0 59-28 110t-78 82q50 32 78 83t28 109v120h60v72zm288-696" />
          </svg>
          <p class="text-sm font-medium mt-1">
            No hay información para mostrar
          </p>
        </div>
      } @else {
        <div class="overflow-x-auto">
          <table
            class="border-y border-stone-300 dark:border-stone-700 text-sm w-full">
            <caption class="text-xs text-start mb-2">
              {{ filteredData().length }} registros encontrados
            </caption>
            <thead class="bg-stone-200 dark:bg-stone-800">
              <tr>
                @for (key of keys(); track $index) {
                  <th class="p-1 text-start whitespace-nowrap">
                    {{
                      (key.replace('_', ' ') | titlecase).replace('Id', 'ID')
                    }}
                  </th>
                }
                <th class="p-1">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (item of filteredData(); track $index) {
                <tr>
                  @for (key of keys(); track $index) {
                    <td class="p-1 whitespace-nowrap">
                      {{ item[key] }}
                    </td>
                  }
                  <td
                    class="p-1 flex justify-center items-center gap-x-2 *:border *:border-stone-300 *:dark:border-stone-700 *:rounded-sm *:hover:bg-stone-200 *:transition-colors *:dark:hover:bg-stone-800 *:duration-300">
                    <button
                      (click)="router.navigate(['/admin', title(), item.id])">
                      <!-- Information Icon -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-stone-800 dark:fill-stone-100 size-5 cursor-pointer"
                        viewBox="0 -960 960 960">
                        <path
                          d="M444-288h72v-240h-72zm36-312q15 0 26-10t10-26q0-15-10-25t-26-11q-15 0-26 10t-10 26q0 15 10 25t26 11m0 504q-79 0-149-30t-122-82q-53-53-83-123T96-480q0-80 30-149 30-70 83-122t122-83q70-30 149-30t149 30 123 83 82 122q30 69 30 149 0 79-30 149t-82 123q-53 52-123 82-69 30-149 30m0-72q130 0 221-91t91-221-91-221-221-91-221 91-91 221 91 221 221 91m0-312" />
                      </svg>
                    </button>
                    @if (editable()) {
                      <button (click)="updateItem(item)">
                        <!-- Edit Icon -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-indigo-500 dark:fill-indigo-400 size-5 cursor-pointer"
                          viewBox="0 -960 960 960">
                          <path
                            d="M216-216h51l375-375-51-51-375 375zm-72 72v-153l498-498q11-11 24-16t27-5 27 5 24 16l51 51q11 11 16 24t5 27-5 27-16 24L297-144zm600-549-51-51zm-128 77-25-26 51 51z" />
                        </svg>
                      </button>
                      <button (click)="deleteItem(item.id)">
                        <!-- Delete Icon -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-red-500 dark:fill-red-400 size-5 cursor-pointer"
                          viewBox="0 -960 960 960">
                          <path
                            d="M312-144q-30 0-51-21t-21-51v-480h-48v-72h192v-48h192v48h192v72h-48v480q0 30-21 51t-51 21zm336-552H312v480h336zM384-288h72v-336h-72zm120 0h72v-336h-72zM312-696v480z" />
                        </svg>
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        @if (editable()) {
          <formulario-component
            action="Actualizar"
            [title]="title()"
            [id]="idForm()"
            [form]="form()"
            [service]="service()"
            [(opened)]="openForm"
            (onComplete)="onUpdate($event)" />
        }
      }
    }
  `,
})
export class TableComponent {
  public readonly router = inject(Router);
  public readonly title = input.required<FormTitle>();
  public readonly loading = input.required<boolean>();
  public readonly service = input<any>();
  public readonly editable = input<boolean>(true);
  public readonly form = input<FormGroup>(new FormGroup({}));
  public readonly data = model.required<TableData[]>();
  public readonly search = signal<string>('');
  public readonly idForm = signal<number>(0);
  public readonly openForm = signal<boolean>(false);
  public readonly keys = computed<(keyof TableData)[]>(
    () => Object.keys(this.data()?.[0] ?? []) as (keyof TableData)[],
  );
  public filteredData = computed<TableData[]>(
    () =>
      this.data()?.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(this.search().toLowerCase()),
        ),
      ) ?? [],
  );

  public deleteItem(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.service()
        .delete(id)
        .subscribe({
          next: () =>
            this.data.update((data) => data.filter((item) => item.id !== id)),
        });
    }
  }

  public updateItem(item: TableData) {
    const { id, ...data } = item;
    this.idForm.set(id);
    this.form().patchValue(data);
    this.openForm.set(true);
  }

  public onUpdate(data: TableData) {
    this.data.update((items) =>
      items.map((item) => (item.id === data.id ? data : item)),
    );
  }
}
