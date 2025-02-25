import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { ToastComponent } from './toast.component';

export type FormTitle = 'estudiantes' | 'materias' | 'matriculas';
type FormAction = 'Registrar' | 'Actualizar';

@Component({
  selector: 'formulario-component',
  imports: [
    TitleCasePipe,
    ButtonComponent,
    ReactiveFormsModule,
    ToastComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #modal
      class="m-auto border rounded-lg border-stone-300 p-4 bg-stone-100 dark:bg-stone-900 backdrop:backdrop-blur-xs dark:text-stone-100 text-stone-800 dark:border-stone-700 border-b-4"
    >
      <h3 class="font-bold text-lg text-center">
        Formulario de {{ title() | titlecase }} 🏫
      </h3>
      <form class="grid grid-cols-2 gap-x-4 gap-y-3 mt-4" [formGroup]="form()">
        @for (key of keysForm(); track $index) {
          <label class="flex flex-col gap-y-1">
            <span class="font-semibold text-sm text-start">
              {{ key.replace('_', ' ') | titlecase }}
            </span>
            <input
              class="rounded-lg border border-stone-300 dark:border-stone-700 dark:bg-stone-800 p-1 text-sm"
              required
              [type]="inputTypes[title()][key]"
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
              class="fill-stone-100 size-5"
              viewBox="0 -960 960 960"
            >
              <path
                d="m291-208-83-83 189-189-189-189 83-83 189 189 189-189 83 83-189 189 189 189-83 83-189-189z"
              />
            </svg>
          </button>
          <button-component
            moreStyles="py-1 px-2 text-sm flex gap-x-1"
            [disabled]="loading()"
            (click)="submit()"
          >
            {{ action() }}
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
      <toast-component
        [success]="false"
        [message]="response()"
        [(opened)]="openErrorToast"
      />
    </dialog>
    <toast-component
      [success]="true"
      [message]="response()"
      [(opened)]="openSuccessToast"
    />
  `,
})
export class FormularioComponent {
  public readonly inputTypes: Record<FormTitle, Record<string, string>> = {
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
  public readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public readonly title = input.required<FormTitle>();
  public readonly action = input.required<FormAction>();
  public readonly form = input.required<FormGroup>();
  public readonly service = input.required<any>();
  public readonly id = input<number>();
  public readonly opened = model.required<boolean>();
  public readonly openSuccessToast = signal<boolean>(false);
  public readonly openErrorToast = signal<boolean>(false);
  public readonly response = signal<string>('');
  public readonly loading = signal<boolean>(false);
  public readonly keysForm = computed<string[]>(() => Object.keys(this.inputTypes[this.title()]));

  constructor() {
    effect(() => {
      if (this.opened()) this.modal()?.nativeElement.showModal();
      else this.modal()?.nativeElement.close();
    });
  }

  public submit(): void {
    if (!this.form()?.valid) {
      this.response.set('Por favor, rellene todos los campos');
      return;
    }

    this.loading.set(true);

    if (this.action() === 'Registrar') {
      this.service()
        ?.create(this.form()?.value)
        .subscribe({
          next: () => {
            this.response.set('El registro se ha guardado correctamente');
            this.openSuccessToast.set(true);
            this.closeAndDeleteData();
          },
          error: ({ error }: { error: any }) => {
            this.response.set(error.response);
            this.openErrorToast.set(true);
          },
        })
        .add(() => this.loading.set(false));
    } else {
      this.service()
        ?.update(this.id(), this.form()?.value)
        .subscribe({
          next: () => {
            this.response.set('El registro se ha actualizado correctamente');
            this.openSuccessToast.set(true);
            this.closeAndDeleteData();
          },
          error: ({ error }: { error: any }) => {
            this.response.set(error.response);
            this.openErrorToast.set(true);
          },
        })
        .add(() => this.loading.set(false));
    }
  }

  public closeAndDeleteData(): void {
    this.opened.set(false);
    this.form()?.reset();
  }
}
