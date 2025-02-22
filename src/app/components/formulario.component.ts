import { Estudiante } from '@/interfaces/estudiante.interface';
import { Materia } from '@/interfaces/materias.interface';
import { Matricula } from '@/interfaces/matricula.interface';
import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { ToastComponent } from './toast.component';

type FormData = Materia | Estudiante | Matricula;
export type FormTitle = 'estudiantes' | 'materias' | 'matriculas';
type FormAction = 'registrar' | 'actualizar';

@Component({
  selector: 'formulario-component',
  imports: [
    TitleCasePipe,
    ButtonComponent,
    ReactiveFormsModule,
    ToastComponent,
  ],
  template: `
    <dialog
      #modal
      class="m-auto border rounded-lg border-stone-300 p-4 bg-stone-100 dark:bg-stone-900 backdrop:backdrop-blur-xs dark:text-stone-100 text-stone-800 dark:border-stone-700 border-b-4"
    >
      <h3 class="font-bold text-lg text-center">
        Formulario de {{ title() | titlecase }} 🏫
      </h3>
      <form class="grid grid-cols-2 gap-x-4 gap-y-3 mt-4" [formGroup]="form()">
        @for (key of keys; track $index) {
          <label class="flex flex-col gap-y-1">
            <span class="font-semibold text-sm text-start">
              {{ (key.replace('_', ' ') | titlecase).replace('Id', 'ID') }}
            </span>
            <input
              class="rounded-lg border border-stone-300 dark:border-stone-700 dark:bg-stone-800 p-1 text-sm"
              required
              [type]="formKeys[title()][key]"
              [placeholder]="'Ingresar ' + key.replace('_', ' ')"
              [formControlName]="key"
            />
          </label>
        }
        <footer class="col-span-2 flex justify-center gap-x-2 mt-4">
          <button
            class="bg-stone-500 hover:bg-stone-600 active:bg-stone-700 border-stone-600 hover:border-stone-700 active:border-stone-800 text-stone-100 rounded-lg transition-colors cursor-pointer font-semibold border-b-3 py-1 px-2 text-sm flex items-center gap-x-1"
            (click)="closeAndDeleteData()"
          >
            Cancelar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-white size-5 stroke-2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <button-component
            moreStyles="py-1 px-2 text-sm flex gap-x-1"
            [disabled]="loading"
            (click)="submit()"
          >
            {{ this.action() | titlecase }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="fill-stone-100 size-5"
            >
              <path
                d="M193-212q-18 7-33-3t-16-30v-139l288-96-288-96v-139q0-19 16-29t33-4l587 235q23 9 23 33t-23 33z"
              />
            </svg>
          </button-component>
        </footer>
      </form>
      <toast-component type="error" [(message)]="error" />
    </dialog>
    <toast-component type="success" [(message)]="response" />
  `,
})
export class FormularioComponent {
  public readonly title = input.required<FormTitle>();
  public readonly action = input<FormAction>('registrar');
  public opened = model<boolean>(false);
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public form = model.required<FormGroup>();
  public id = input<number>();
  public service = input<any>();
  public response: string = '';
  public error: string = '';
  public loading: boolean = false;
  public formKeys: Record<FormTitle, Record<string, string>> = {
    estudiantes: {
      nombre: 'text',
      apellido: 'text',
      cedula: 'number',
      fecha_nacimiento: 'date',
      ciudad: 'text',
      direccion: 'text',
      telefono: 'number',
      email: 'email',
    },
    materias: {
      nombre: 'text',
      descripcion: 'text',
      codigo: 'text',
      creditos: 'number',
    },
    matriculas: {
      codigo: 'text',
      descripcion: 'text',
      id_estudiante: 'number',
      id_materia: 'number',
    },
  };

  constructor() {
    effect(() => {
      if (this.opened()) this.modal()?.nativeElement.showModal();
      else this.modal()?.nativeElement.close();
    });
  }

  public get keys(): (keyof FormData)[] {
    return Object.keys(this.formKeys[this.title()]) as (keyof FormData)[];
  }

  public submit(): void {
    if (!this.form()?.valid) {
      this.error = 'Por favor, rellene todos los campos';
      return;
    }

    this.loading = true;
    if (this.action() === 'registrar') {
      this.service()
        ?.create(this.form()?.value)
        .subscribe({
          next: () => {
            this.response = 'El registro se ha guardado correctamente';
            this.form()?.reset();
            this.opened.set(false);
          },
          error: ({ error }: { error: any }) => {
            this.error = error.response;
          },
        })
        .add(() => (this.loading = false));
    } else {
      this.service()
        ?.update(this.id(), this.form()?.value)
        .subscribe({
          next: () => {
            this.response = 'El registro se ha actualizado correctamente';
            this.form()?.reset();
            this.opened.set(false);
          },
          error: ({ error }: { error: any }) => {
            this.error = error.response;
          },
        })
        .add(() => (this.loading = false));
    }
  }

  public closeAndDeleteData(): void {
    this.opened.set(false);
    this.form()?.reset();
  }
}
