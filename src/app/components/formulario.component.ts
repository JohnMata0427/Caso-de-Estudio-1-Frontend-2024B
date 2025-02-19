import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from './button.component';
import { TitleCasePipe } from '@angular/common';
import { Materia } from '../interfaces/materias.interface';
import { Estudiante } from '../interfaces/estudiante.interface';
import { Matricula } from '../interfaces/matricula.interface';

type FormData = Materia | Estudiante | Matricula;

@Component({
  selector: 'formulario-component',
  imports: [TitleCasePipe, ButtonComponent],
  template: `
    <dialog #modal class="m-auto border rounded-lg border-stone-300 p-4 bg-stone-100 dark:bg-stone-900">
      <h3 class="font-bold">Formulario de {{ title() | titlecase }}s</h3>
      <form class="grid grid-cols-2">
        @for (key of keys; track key) {
          <label class="flex flex-col gap-y-1">
            <span class="font-semibold">{{ key }}</span>
            <input
              type="text"
              class="rounded-lg border border-stone-300 p-1"
              [placeholder]="key"
              [value]="data()?.[key]"
            />
          </label>
        }
      </form>
      <button-component
        moreStyles="py-1 px-2 text-sm flex gap-x-1"
        (click)="close()"
      >
        <svg
        
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button-component>
    </dialog>
  `,
})
export class FormularioComponent {
  public readonly title = input.required<string>();
  public opened = model<boolean>(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public data = model<FormData>();

  constructor() {
    effect(() => {
      if (this.opened()) this.modal()?.nativeElement.showModal();
      else this.modal()?.nativeElement.close();
    });
  }

  public get keys(): Array<keyof FormData> {
    return Object.keys(this.data() ?? {}) as Array<keyof FormData>;
  }

  public close(): void {
    this.opened.update(() => false);
  }
}
