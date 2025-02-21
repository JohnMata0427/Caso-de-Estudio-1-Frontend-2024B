import { Component, input } from '@angular/core';
import { Materia } from '../interfaces/materias.interface';
import { Estudiante } from '../interfaces/estudiante.interface';
import { Matricula } from '../interfaces/matricula.interface';
import { TitleCasePipe } from '@angular/common';

type TableData = Materia | Estudiante | Matricula;

@Component({
  selector: 'table-component',
  imports: [TitleCasePipe],
  template: `
    @if (loading()) {
      <div class="flex gap-x-2 justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-indigo-500 size-5 animate-spin opacity-90"
          viewBox="0 -960 960 960"
        >
          <path
            d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480q0-87 33-163t89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17q25 0 42 17t17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33Z"
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
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
})
export class TableComponent {
  public readonly data = input<TableData[]>();
  public loading = input<boolean>(true);

  public get keys(): Array<keyof TableData> {
    return Object.keys(this.data()?.[0] ?? {}) as Array<keyof TableData>;
  }
}
