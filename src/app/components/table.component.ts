import {
  COLUMN_NAMES,
  type SystemData,
  type SystemTitle,
} from '@/constants/properties.constant';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioComponent } from './formulario.component';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'table-component',
  imports: [FormularioComponent, FormsModule, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="flex gap-x-2 justify-center items-center">
        <!-- Spinner Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-indigo-500 size-5 animate-spin opacity-90"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 0 0 0 20v-3a7 7 0 1 1 7-7h3c0-5-5-10-10-10" />
        </svg>
        <p class="text-sm font-medium mt-1">Cargando información...</p>
      </div>
    } @else {
      @if (editable()) {
        <label class="relative" for="search">
          <!-- Search Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-stone-800 dark:fill-stone-100 absolute left-2 size-5 top-0.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M18.32 14.43A8 8 0 0 0 6.34 3.87a8 8 0 0 0 10.57 11.97l.04.05 4.24 4.24a1 1 0 1 0 1.42-1.41l-4.25-4.24zm-2.08-9.15a6 6 0 1 1-8.48 8.49 6 6 0 0 1 8.48-8.49"
            />
          </svg>
          <input
            type="search"
            id="search"
            name="search"
            class="w-full pl-9 py-2 pr-2 rounded-lg outline-indigo-500 focus:outline-3 text-xs bg-stone-200 border border-stone-300 placeholder:text-stone-500 dark:bg-stone-800 dark:border-stone-700 dark:caret-stone-100 mb-4"
            placeholder="Buscar registros..."
            [(ngModel)]="search"
          />
        </label>
      }
      @if (filteredData().length) {
        <div class="overflow-x-auto w-full">
          <table
            class="border-y border-stone-300 dark:border-stone-700 text-sm w-full"
          >
            <caption class="text-xs text-start mb-2">
              {{ filteredData().length }} registros encontrados
            </caption>
            <thead class="bg-stone-200 dark:bg-stone-800">
              <tr>
                @for (column of columns(); track $index) {
                  <th class="p-1 text-start whitespace-nowrap">
                    {{ column }}
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
                    class="p-1 flex justify-center items-center gap-x-2 *:border *:border-stone-300 *:dark:border-stone-700 *:rounded-sm *:hover:bg-stone-200 *:transition-colors *:dark:hover:bg-stone-800 *:duration-300"
                  >
                    <button
                      (click)="router.navigate(['/admin', title(), item.id])"
                    >
                      <!-- Information Icon -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-stone-800 dark:fill-stone-100 size-5 cursor-pointer"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11 17h2v-6h-2zm1-8q.42 0 .71-.29T13 8t-.29-.71T12 7t-.71.29T11 8t.29.71T12 9m0 13q-2.08 0-3.9-.79t-3.17-2.14-2.14-3.17T2 12t.79-3.9 2.14-3.17T8.1 2.78 12 2t3.9.79 3.17 2.14 2.14 3.17T22 12t-.79 3.9-2.14 3.17-3.17 2.14T12 22m0-2q3.35 0 5.67-2.33T20 12t-2.33-5.67T12 4 6.33 6.33 4 12t2.33 5.67T12 20m0-8"
                        />
                      </svg>
                    </button>
                    @if (editable()) {
                      <button (click)="updateItem(item)">
                        <!-- Edit Icon -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-indigo-500 dark:fill-indigo-400 size-5 cursor-pointer"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 19h1.43l9.77-9.78-1.42-1.42L5 17.57zm-2 2v-4.25L16.2 3.57q.3-.27.66-.42t.77-.15.77.15.65.45L20.43 5q.3.28.43.65t.14.75q0 .4-.14.76t-.43.67L7.25 21zM19 6.4 17.6 5zm-3.52 2.13-.7-.73 1.42 1.42z"
                          />
                        </svg>
                      </button>
                      <button (click)="deleteItem(item.id)">
                        <!-- Delete Icon -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-red-500 dark:fill-red-400 size-5 cursor-pointer"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7 21q-.82 0-1.41-.59T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .82-.59 1.41T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                          />
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
            (onComplete)="onUpdate($event)"
          />
          <toast-component
            [success]="true"
            [messages]="['Registro eliminado correctamente']"
            [(opened)]="openDeleteToast"
          />
        }
      } @else {
        <div class="flex gap-x-2 justify-center items-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-stone-800 dark:fill-stone-100 size-5"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M4 12a8 8 0 0 1 1.7-4.9l11.2 11.2A8 8 0 0 1 12 20a8 8 0 0 1-8-8m14.3 4.9L7.1 5.7A8 8 0 0 1 12 4a8 8 0 0 1 8 8 8 8 0 0 1-1.7 4.9"
            />
          </svg>
          <p class="text-sm font-medium mt-1">
            No hay información para mostrar
          </p>
        </div>
      }
    }
  `,
})
export class TableComponent {
  public readonly router = inject(Router);
  public readonly data = model.required<SystemData[]>();
  public readonly onDelete = output<number>();
  public readonly title = input.required<SystemTitle>();
  public readonly loading = input.required<boolean>();
  public readonly service = input<any>();
  public readonly editable = input<boolean>(true);
  public readonly form = input<FormGroup>(new FormGroup({}));
  public readonly search = signal<string>('');
  public readonly idForm = signal<number>(0);
  public readonly openForm = signal<boolean>(false);
  public readonly openDeleteToast = signal<boolean>(false);
  public readonly columns = computed(() => COLUMN_NAMES[this.title()]);
  public readonly keys = computed<(keyof SystemData)[]>(
    () => Object.keys(this.data()[0]) as (keyof SystemData)[],
  );
  public filteredData = computed<SystemData[]>(() =>
    this.data().filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(this.search().toLowerCase()),
      ),
    ),
  );

  public deleteItem(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?'))
      this.service()
        .delete(id)
        .subscribe({
          next: () => {
            this.onDelete.emit(id);
            this.openDeleteToast.set(true);
          },
        });
  }

  public updateItem(item: SystemData) {
    const { id, ...data } = item;
    this.idForm.set(id);
    this.form().setValue(data);
    this.openForm.set(true);
  }

  public onUpdate(data: SystemData) {
    this.data.update(items =>
      items.map(item => (item.id === data.id ? data : item)),
    );
  }
}
