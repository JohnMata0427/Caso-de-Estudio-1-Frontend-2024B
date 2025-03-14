import { INPUT_NAMES, type SystemTitle } from '@/constants/properties.constant';
import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { ToastComponent } from './toast.component';

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
          @let input = inputNames()[key];
          <div class="flex flex-col gap-y-1">
            <label class="font-semibold text-sm text-start" [htmlFor]="key">
              {{ key.replace('_', ' ') | titlecase }}
              <span class="text-red-500">*</span>
            </label>
            <input
              class="rounded-lg border border-stone-300 dark:border-stone-700 dark:bg-stone-800 p-1 text-sm"
              required
              [id]="key"
              [name]="key"
              [type]="input.type"
              [placeholder]="input.placeholder"
              [formControlName]="key"
            />
          </div>
        }
        <footer class="col-span-2 flex justify-center gap-x-2 mt-4">
          <button
            class="bg-stone-500 hover:bg-stone-600 active:bg-stone-700 border-stone-600 hover:border-stone-700 active:border-stone-800 text-stone-100 rounded-lg transition-colors cursor-pointer font-semibold border-b-3 py-1 px-2 text-sm flex items-center gap-x-1"
            (click)="opened.set(false)"
          >
            Cancelar
            <!-- Close Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-stone-100 size-5"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6z"
              />
            </svg>
          </button>
          <button-component
            moreStyles="py-1 px-2 text-sm flex gap-x-2"
            [disabled]="loading()"
            (click)="onSubmit()"
          >
            {{ action() }}
            <!-- Send Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-stone-100 size-5"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 7v12q0 .8-.6 1.4T19 21H5q-.8 0-1.4-.6T3 19V5q0-.8.6-1.4T5 3h12zm-9 11q1.3 0 2.1-.9T15 15t-.9-2.1T12 12t-2.1.9T9 15t.9 2.1 2.1.9m-6-8h9V6H6z"
              />
            </svg>
          </button-component>
        </footer>
      </form>
      <toast-component
        [success]="false"
        [messages]="messages()"
        [(opened)]="openErrorToast"
      />
    </dialog>
    <toast-component
      [success]="true"
      [messages]="messages()"
      [(opened)]="openSuccessToast"
    />
  `,
})
export class FormularioComponent {
  public readonly modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public readonly opened = model.required<boolean>();
  public readonly title = input.required<SystemTitle>();
  public readonly action = input.required<FormAction>();
  public readonly form = input.required<FormGroup>();
  public readonly service = input.required<any>();
  public readonly id = input<number>(0);
  public readonly onComplete = output<any>();
  public readonly openSuccessToast = signal<boolean>(false);
  public readonly openErrorToast = signal<boolean>(false);
  public readonly messages = signal<string[]>([]);
  public readonly loading = signal<boolean>(false);
  public readonly inputNames = computed(() => INPUT_NAMES[this.title()]);
  public readonly keysForm = computed<string[]>(() =>
    Object.keys(this.inputNames()),
  );

  constructor() {
    effect(() => {
      if (this.opened()) this.modal()?.nativeElement.showModal();
      else this.modal()?.nativeElement.close();
    });
  }

  public onSubmit(): void {
    if (this.form().invalid) {
      this.messages.set(['Todos los campos son requeridos']);
      this.openErrorToast.set(true);
      return;
    }

    this.loading.set(true);

    if (this.action() === 'Registrar') {
      this.service()
        .create(this.form().value)
        .subscribe({ next: this.emitSuccessItem, error: this.showErrors })
        .add(() => this.loading.set(false));
    } else {
      this.service()
        .update(this.id(), this.form().value)
        .subscribe({ next: this.emitSuccessItem, error: this.showErrors })
        .add(() => this.loading.set(false));
    }
  }

  private showErrors = ({ error }: { error: any }): void => {
    const { response = 'Se ha producido un error, intente nuevamente' } = error;
    const { errors = [response] } = response;
    this.messages.set(errors);
    this.openErrorToast.set(true);
  };

  private emitSuccessItem = (response: any): void => {
    this.form().reset();
    this.opened.set(false);
    this.onComplete.emit(response);
    this.messages.set(['El registro se ha guardado correctamente']);
    this.openSuccessToast.set(true);
  };
}
