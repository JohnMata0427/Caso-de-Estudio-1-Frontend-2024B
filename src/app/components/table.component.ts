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
    <div class="rounded-lg overflow-auto">
      <table
        class="w-full border-collapse border border-stone-200 dark:border-stone-800 text-sm rounded-lg"
      >
        <thead class="bg-stone-200 dark:bg-stone-800">
          <tr>
            @for (key of keys; track key) {
              <th
                class="border border-stone-300 dark:border-stone-700 p-1 text-start"
              >
                {{ key | titlecase }}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (item of data(); track item) {
            <tr>
              @for (key of keys; track key) {
                <td class="border border-stone-200 dark:border-stone-800 p-1">
                  {{ item[key] }}
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class TableComponent {
  public readonly data = input<TableData[]>();

  public get keys(): Array<keyof TableData> {
    return Object.keys(this.data()?.[0] ?? {}) as Array<keyof TableData>;
  }
}
