import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthLayout } from '../../layouts/auth.layout';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ToastComponent } from '../../components/toast.component';
import { ButtonComponent } from '../../components/button.component';

@Component({
  imports: [
    AuthLayout,
    ReactiveFormsModule,
    NgOptimizedImage,
    ToastComponent,
    ButtonComponent,
  ],
  template: `
    <auth-layout>
      <form
        class="w-2/3 flex flex-col gap-y-4"
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
      >
        <div class="flex flex-col gap-y-2">
          <img
            class="max-w-12 mx-auto"
            ngSrc="icono.png"
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
        <label class="relative">
          <!-- Email Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="fill-indigo-500 absolute left-2 size-6 inset-y-0 h-full"
          >
            <path
              d="M168-192q-30 0-51-21t-21-51v-432q0-30 21-51t51-21h624q30 0 51 21t21 51v432q0 30-21 51t-51 21H168Zm312-245 10-1q5-1 9-5l276-158q8-5 13-13t4-19q0-21-18-32-19-10-38 1L480-517 225-663q-19-11-38-1t-19 31q0 10 5 19t13 13l276 158 9 5q5 2 9 1Z"
            />
          </svg>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full pl-9 pr-3 py-2 rounded-lg outline-indigo-500 focus:outline-3 text-sm bg-stone-100 border border-stone-300 placeholder:text-stone-400 dark:bg-stone-800 dark:border-stone-700"
            placeholder="Ingrese su correo electrónico"
            formControlName="email"
          />
        </label>

        @if (form.get('email')?.value && form.get('email')?.invalid) {
          <small class="text-xs text-red-500 dark:text-red-400 text-center">
            Por favor, ingrese un correo electrónico válido
          </small>
        }

        <div class="relative">
          <!-- Password Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="fill-indigo-500 absolute left-2 size-6 inset-y-0 h-full"
          >
            <path
              d="M264-96q-30 0-51-21t-21-51v-384q0-30 21-51t51-21h24v-96q0-80 56-136t136-56q80 0 136 56t56 136v96h24q30 0 51 21t21 51v384q0 30-21 51t-51 21H264Zm216-192q30 0 51-21t21-51q0-30-21-51t-51-21q-30 0-51 21t-21 51q0 30 21 51t51 21ZM360-624h240v-96q0-50-35-85t-85-35q-50 0-85 35t-35 85v96Z"
            />
          </svg>
          <input
            id="password"
            name="password"
            class="w-full px-9 py-2 rounded-lg outline-indigo-500 focus:outline-3 text-sm bg-stone-100 border border-stone-300 placeholder:text-stone-400 dark:bg-stone-800 dark:border-stone-700"
            placeholder="Ingrese su contraseña"
            formControlName="password"
            minlength="8"
            [type]="showPassword ? 'text' : 'password'"
          />
          <!-- Show Password Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-indigo-500 absolute right-2 size-6 inset-y-0 h-full cursor-pointer"
            viewBox="0 -960 960 960"
            (click)="showPassword = !showPassword"
          >
            @if (showPassword) {
              <path
                d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-130 0-239-69T68-445q-5-8-7-17t-2-18l2-18q2-9 7-17 64-114 173-183t239-70q130 0 239 70t173 183q5 8 7 17t2 18l-2 18q-2 9-7 17-64 114-173 184t-239 69Z"
              />
            } @else {
              <path
                d="M743-116 638-220q-38 12-77 20t-81 8q-131 0-240-69T67-445q-5-8-7-17t-2-18q0-9 3-18t7-17q25-43 55-82t67-72l-75-75q-11-11-11-25t11-25q11-11 26-11t25 11l628 628q11 11 11 25t-11 25q-11 11-25 11t-26-11ZM480-312q14 0 28-3t28-7L322-536l-6 28-4 28q0 70 49 119t119 49Zm0-456q131 0 241 69t173 185q5 8 7 17t2 17l-2 18q-2 9-7 16-19 35-42 67t-52 60q-12 12-29 12t-29-13l-91-91q-6-6-8-15t0-17l4-18q2-9 1-19 0-70-49-119t-119-49q-10 0-19 2t-18 3q-8 2-16 0t-15-8l-41-41q-17-17-11-40t29-28q23-5 46-6t45-2Zm73 217q8 8 13 18t7 20q2 7-4 10t-12-2l-51-52q-5-5-2-11t10-6q11 3 21 9t18 14Z"
              />
            }
          </svg>
        </div>
        <button-component
          moreStyles="px-4 py-2 flex justify-center items-center gap-x-2 w-full"
          [disabled]="this.loading"
        >
          @if (!loading) {
            Iniciar sesión
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="fill-stone-100 size-6"
            >
              <path
                d="M193-212q-18 7-33-3t-16-30v-139l288-96-288-96v-139q0-19 16-29t33-4l587 235q23 9 23 33t-23 33L193-212Z"
              />
            </svg>
          } @else {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-indigo-400 size-6 animate-spin opacity-90"
              viewBox="0 -960 960 960"
            >
              <path
                d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480q0-87 33-163t89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17q25 0 42 17t17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33Z"
              />
            </svg>
          }
        </button-component>
      </form>
    </auth-layout>
    <toast-component type="error" [(message)]="message" />
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
  public message: string = '';
  public loading: boolean = false;
  public showPassword: boolean = false;
  public color: string = '';
  private title: Title = inject(Title);
  private router: Router = inject(Router);
  private authService = inject(AuthService);

  public ngOnInit(): void {
    this.title.setTitle('Iniciar sesión • Sistema de Gestión de Matriculas');
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const { email, password } = this.form.value;

      this.authService
        .login(email, password)
        .subscribe({
          next: () => this.router.navigate(['/admin/materias']),
          error: () =>
            (this.message = 'Correo electrónico o contraseña incorrectos'),
        })
        .add(() => (this.loading = false));
    } else this.message = 'Por favor, complete los campos correctamente';
  }
}
