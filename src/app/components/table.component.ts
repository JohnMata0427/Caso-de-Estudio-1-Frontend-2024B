import { Estudiante } from '@/interfaces/estudiante.interface';
import { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { TitleCasePipe } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormTitle, FormularioComponent } from './formulario.component';

type TableData = Materia | Estudiante | Matricula;

@Component({
  selector: 'table-component',
  imports: [TitleCasePipe, FormularioComponent],
  template: `
    @if (loading()) {
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
      <div class="overflow-auto">
        <table
          class="border-collapse border-y border-stone-300 dark:border-stone-700 text-sm rounded-lg w-full"
        >
          <thead class="bg-stone-200 dark:bg-stone-800">
            <tr>
              @for (key of keys; track $index) {
                <th class="p-1 text-start text-nowrap">
                  {{ (key.replace('_', ' ') | titlecase).replace('Id', 'ID') }}
                </th>
              }
              <th class="p-1 text-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (item of data(); track $index) {
              <tr>
                @for (key of keys; track $index) {
                  <td class="p-1 text-nowrap">
                    {{ item[key] }}
                  </td>
                }
                <td
                  class="p-1 text-nowrap flex justify-center items-center gap-x-2"
                >
                  <button>
                    <!-- Information Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-stone-800 dark:fill-stone-100 size-5 cursor-pointer"
                      viewBox="0 -960 960 960"
                    >
                      <path
                        d="M444-288h72v-240h-72zm36-312q15 0 26-10t10-26q0-15-10-25t-26-11q-15 0-26 10t-10 26q0 15 10 25t26 11m0 504q-79 0-149-30t-122-82q-53-53-83-123T96-480q0-80 30-149 30-70 83-122t122-83q70-30 149-30t149 30 123 83 82 122q30 69 30 149 0 79-30 149t-82 123q-53 52-123 82-69 30-149 30m0-72q130 0 221-91t91-221-91-221-221-91-221 91-91 221 91 221 221 91m0-312"
                      />
                    </svg>
                  </button>
                  <button (click)="updateItem(item)">
                    <!-- Edit Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-indigo-500 dark:fill-indigo-400 size-5 cursor-pointer"
                      viewBox="0 -960 960 960"
                    >
                      <path
                        d="M216-216h51l375-375-51-51-375 375zm-72 72v-153l498-498q11-11 24-16t27-5 27 5 24 16l51 51q11 11 16 24t5 27-5 27-16 24L297-144zm600-549-51-51zm-128 77-25-26 51 51z"
                      />
                    </svg>
                  </button>
                  <button (click)="deleteItem(item.id)">
                    <!-- Delete Icon -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-red-500 dark:fill-red-400 size-5 cursor-pointer"
                      viewBox="0 -960 960 960"
                    >
                      <path
                        d="M312-144q-30 0-51-21t-21-51v-480h-48v-72h192v-48h192v48h192v72h-48v480q0 30-21 51t-51 21zm336-552H312v480h336zM384-288h72v-336h-72zm120 0h72v-336h-72zM312-696v480z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <formulario-component
          action="actualizar"
          [title]="title()"
          [id]="id"
          [form]="form()"
          [service]="service()"
          [(opened)]="openForm"
        />
      </div>
    }
  `,
})
export class TableComponent {
  public readonly title = input.required<FormTitle>();
  public readonly data = input<TableData[]>();
  public loading = input<boolean>(true);
  public openForm: boolean = false;
  public id: number = 0;
  public form = model.required<FormGroup>();
  public service = input.required<any>();

  public get keys(): Array<keyof TableData> {
    return Object.keys(this.data()?.[0] ?? {}) as Array<keyof TableData>;
  }

  public deleteItem(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.service()
        .delete(id)
        .subscribe({
          next: () => console.log('Registro eliminado'),
          error: (error: any) => console.error('Error al eliminar:', error),
        });
    }
  }

  public updateItem(item: TableData) {
    const { id, ...data } = item;
    this.id = id;
    this.form().patchValue(data);
    this.openForm = true;
  }
}
