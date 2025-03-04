import { ButtonComponent } from '@/components/button.component';
import { ToastComponent } from '@/components/toast.component';
import { AuthLayout } from '@/layouts/auth.layout';
import { AuthService } from '@/services/auth.service';
import { NgOptimizedImage } from '@angular/common';
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
  imports: [
    AuthLayout,
    ReactiveFormsModule,
    NgOptimizedImage,
    ToastComponent,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <auth-layout>
      <form
        class="w-2/3 flex flex-col gap-y-4 py-4"
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
      >
        <div class="flex flex-col gap-y-2">
          <img
            class="max-w-12 mx-auto"
            ngSrc="icono.webp"
            alt="Icono de la aplicación"
            width="48"
            height="48"
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
            viewBox="0 -960 960 960"
            class="fill-indigo-500 absolute left-2 size-6 inset-y-0 h-full"
          >
            <path
              d="M168-192q-30 0-51-21t-21-51v-432q0-30 21-51t51-21h624q30 0 51 21t21 51v432q0 30-21 51t-51 21zm312-245 10-1q5-1 9-5l276-158q8-5 13-13t4-19q0-21-18-32-19-10-38 1L480-517 225-663q-19-11-38-1t-19 31q0 10 5 19t13 13l276 158 9 5q5 2 9 1"
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
          <!-- Password Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="fill-indigo-500 absolute left-2 size-6 inset-y-0 h-full"
          >
            <path
              d="M264-96q-30 0-51-21t-21-51v-384q0-30 21-51t51-21h24v-96q0-80 56-136t136-56 136 56 56 136v96h24q30 0 51 21t21 51v384q0 30-21 51t-51 21zm216-192q30 0 51-21t21-51-21-51-51-21-51 21-21 51 21 51 51 21M360-624h240v-96q0-50-35-85t-85-35-85 35-35 85z"
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
            viewBox="0 -960 960 960"
            (click)="togglePasswordVisibility()"
          >
            @if (showPassword()) {
              <path
                d="M480-312q70 0 119-49t49-119-49-119-119-49-119 49-49 119 49 119 119 49m0-72q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28m0 192q-130 0-239-69T68-445q-5-8-7-17t-2-18l2-18q2-9 7-17 64-114 173-183t239-70q130 0 239 70t173 183q5 8 7 17t2 18l-2 18q-2 9-7 17-64 114-173 184t-239 69"
              />
            } @else {
              <path
                d="M743-116 638-220q-38 12-77 20t-81 8q-131 0-240-69T67-445q-5-8-7-17t-2-18 3-18 7-17q25-43 55-82t67-72l-75-75q-11-11-11-25t11-25 26-11 25 11l628 628q11 11 11 25t-11 25-25 11-26-11M480-312q14 0 28-3t28-7L322-536l-6 28-4 28q0 70 49 119t119 49m0-456q131 0 241 69t173 185q5 8 7 17t2 17l-2 18q-2 9-7 16-19 35-42 67t-52 60q-12 12-29 12t-29-13l-91-91q-6-6-8-15t0-17l4-18q2-9 1-19 0-70-49-119t-119-49q-10 0-19 2t-18 3q-8 2-16 0t-15-8l-41-41q-17-17-11-40t29-28 46-6 45-2m73 217q8 8 13 18t7 20q2 7-4 10t-12-2l-51-52q-5-5-2-11t10-6q11 3 21 9t18 14"
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
              viewBox="0 -960 960 960"
              class="fill-stone-100 size-6"
            >
              <path
                d="M193-212q-18 7-33-3t-16-30v-139l288-96-288-96v-139q0-19 16-29t33-4l587 235q23 9 23 33t-23 33z"
              />
            </svg>
          } @else {
            <!-- Spinner Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-indigo-400 size-6 animate-spin opacity-90"
              viewBox="0 -960 960 960"
            >
              <path
                d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480t33-163 89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17 42 17 17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33"
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
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  private authService = inject(AuthService);
  public errorMessage = signal<string[]>([]);
  public showToast = signal<boolean>(false);
  public loading = signal<boolean>(false);
  public showPassword = signal<boolean>(false);

  public togglePasswordVisibility = (): void =>
    this.showPassword.update((state) => !state);

  public onSubmit(): void {
    if (this.form.valid) {
      this.loading.set(true);

      this.authService
        .login(this.form.value)
        .subscribe({
          next: () => window.location.reload(),
          error: ({ error }) => {
            this.errorMessage.set([error?.response ?? 'Ha ocurrido un error']);
            this.showToast.set(true);
          },
        })
        .add(() => this.loading.set(false));
    } else
      this.errorMessage.set(['Todos los campos son requeridos']);
  }
}
