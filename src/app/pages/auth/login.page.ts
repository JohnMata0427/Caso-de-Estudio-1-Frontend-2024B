import { ButtonComponent } from '@/components/button.component';
import { ToastComponent } from '@/components/toast.component';
import { AuthLayout } from '@/layouts/auth.layout';
import { AuthService } from '@/services/auth.service';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  imports: [AuthLayout, ReactiveFormsModule, ToastComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <auth-layout>
      <form
        class="w-2/3 flex flex-col gap-y-4 py-4"
        [formGroup]="form()"
        (ngSubmit)="onSubmit()"
      >
        <div class="flex flex-col gap-y-2">
          <img
            class="max-w-12 mx-auto"
            src="icono.webp"
            alt="Icono de la aplicación size-12"
          />
          <h1 class="text-xl sm:text-2xl font-bold text-center">
            Sistema de Gestión de Matriculas
          </h1>
          <small class="text-center text-stone-500 text-xs sm:text-sm">
            Este sistema permite gestionar las matriculas de los estudiantes de
            la institución.
          </small>
        </div>
        <label class="relative" for="email">
          <!-- Email Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="fill-indigo-500 absolute size-6 left-2 inset-y-0 h-full"
          >
            <path
              d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z"
            />
          </svg>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full pl-9 pr-3 py-2 rounded-lg outline-indigo-500 focus:outline-3 text-sm bg-stone-100 border border-stone-300 placeholder:text-stone-400 dark:bg-stone-800 dark:border-stone-700"
            placeholder="Ingrese su correo electrónico"
            formControlName="email"
            required
          />
        </label>

        <label class="relative" for="password">
          <!-- Lock Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="fill-indigo-500 absolute left-2 size-6 inset-y-0 h-full"
          >
            <path
              d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0z"
            />
          </svg>
          <input
            id="password"
            name="password"
            class="w-full px-9 py-2 rounded-lg outline-indigo-500 focus:outline-3 text-sm bg-stone-100 border border-stone-300 placeholder:text-stone-400 dark:bg-stone-800 dark:border-stone-700"
            placeholder="Ingrese su contraseña"
            formControlName="password"
            minlength="8"
            required
            [type]="showPassword() ? 'text' : 'password'"
          />
          <!-- Eye Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-indigo-500 absolute right-2 size-6 inset-y-0 h-full cursor-pointer"
            viewBox="0 0 24 24"
            (click)="togglePasswordVisibility()"
          >
            @if (showPassword()) {
              <path
                d="M12 4.5C7 4.5 2.7 7.6 1 12a11.8 11.8 0 0 0 22 0c-1.7-4.4-6-7.5-11-7.5M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10m0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
              />
            } @else {
              <path
                d="M12 7a5 5 0 0 1 4.6 6.8l3 3c1.5-1.3 2.7-3 3.4-4.8A11.8 11.8 0 0 0 8 5.2l2.2 2.2C10.7 7 11.4 7 12 7M2 4.3l2.3 2.2.4.5A11.8 11.8 0 0 0 1 12a11.8 11.8 0 0 0 15.4 6.7l.4.4 3 2.9 1.2-1.3L3.3 3zm5.5 5.5 1.6 1.6-.1.6a3 3 0 0 0 3.7 3l1.5 1.5a5 5 0 0 1-6.7-6.7m4.3-.8 3.2 3.2V12a3 3 0 0 0-3-3z"
              />
            }
          </svg>
        </label>
        <button-component
          moreStyles="px-4 py-2 flex justify-center items-center gap-x-2 w-full"
          [disabled]="loading()"
        >
          @if (!loading()) {
            Iniciar sesión
            <!-- Send Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="fill-stone-100 size-6"
            >
              <path
                d="M4.4 19.4q-.5.2-1 0t-.4-.9V14l8-2-8-2V5.5q0-.6.5-.8t.9-.1L19.8 11q.6.2.6.9t-.6 1z"
              />
            </svg>
          } @else {
            <!-- Spinner Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-indigo-400 size-6 animate-spin"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2a10 10 0 0 0 0 20v-3a7 7 0 1 1 7-7h3c0-5-5-10-10-10"
              />
            </svg>
          }
        </button-component>
      </form>
    </auth-layout>
    <toast-component
      [success]="false"
      [messages]="errorMessage()"
      [(opened)]="showToast"
    />
  `,
})
export class LoginPage {
  private authService = inject(AuthService);
  public form = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }),
  ).asReadonly();
  public errorMessage = signal<string[]>([]);
  public showToast = signal<boolean>(false);
  public loading = signal<boolean>(false);
  public showPassword = signal<boolean>(false);

  public togglePasswordVisibility = (): void =>
    this.showPassword.update(state => !state);

  public onSubmit(): void {
    if (this.form().invalid) {
      this.errorMessage.set(['Todos los campos son requeridos']);
      this.showToast.set(true);
      return;
    }

    this.loading.set(true);
    this.authService
      .login(this.form().value)
      .subscribe({
        next: () => window.location.reload(),
        error: ({ error }) => {
          const { response = 'Se ha producido un error, intente nuevamente' } =
            error;
          const { errors = [response] } = response;
          this.errorMessage.set(errors);
          this.showToast.set(true);
        },
      })
      .add(() => this.loading.set(false));
  }
}
