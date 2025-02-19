import { NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../interfaces/usuario.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'admin-layout',
  imports: [RouterLink, NgClass, NgOptimizedImage, TitleCasePipe],
  template: `
    <div class="min-h-screen flex flex-col">
      <header
        class="py-2 px-6 border-b border-stone-300 dark:border-stone-800 flex justify-between items-center"
      >
        <div class="flex gap-x-2">
          <img
            ngSrc="icono.png"
            alt="Icono de la aplicación"
            class="object-contain"
            width="24"
            height="24"
          />
          <h1 class="font-semibold">
            Sistema de Gestión de Matriculas
          </h1>
        </div>
        <button
          class="bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-600 hover:border-red-700 active:border-red-800 text-stone-100 rounded-lg transition-colors cursor-pointer font-semibold border-b-3 py-1 px-3 text-xs flex items-center gap-x-2"
          (click)="logout()"
        >
          Salir
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 fill-stone-100"
            viewBox="0 -960 960 960"
          >
            <path
              d="M216-144q-30 0-51-21t-21-51v-528q0-30 21-51t51-21h264v72H216v528h264v72H216Zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168-168 168Z"
            />
          </svg>
        </button>
      </header>
      <main class="flex flex-1">
        <nav class="px-6 py-2 border-r border-stone-300 dark:border-stone-800 hidden sm:block">
          <h3 class="text-sm font-bold">Bienvenido</h3>
          <article
            class="flex flex-col items-center justify-center my-5 h-22 w-40"
            [ngClass]="{ 'animate-pulse': loading }"
          >
            @if (loading) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fill-indigo-500 size-5 animate-spin opacity-90"
                viewBox="0 -960 960 960"
              >
                <path
                  d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480q0-87 33-163t89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17q25 0 42 17t17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33Z"
                />
              </svg>
              <p class="text-xs font-medium datos mt-1">Cargando...</p>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-8 mx-auto fill-stone-800 dark:fill-stone-100"
                viewBox="0 -960 960 960"
              >
                <path
                  d="M480-408q60 0 102-42t42-102q0-60-42-102t-102-42q-60 0-102 42t-42 102q0 60 42 102t102 42Zm0 237q58-18 104-57t80-91q-43-20-89-30t-95-11q-48 0-94 11t-90 30q34 51 80 91t104 57Zm0 71h-12q-6 0-11-3-131-43-210-159t-79-253v-180q0-23 13-41t33-26l240-92q13-5 26-5t26 5l240 92q21 8 34 26t12 41v180q0 137-79 253T503-103l-11 3h-12Z"
                />
              </svg>
              <strong class="text-sm font-medium">
                {{ user.nombre }} {{ user.apellido }}
              </strong>
              <small class="text-[10px] text-stone-700 dark:text-stone-300">
                {{ user.email }}
              </small>
              <p class="text-xs mt-1">
                <span class="text-green-500">•</span>
                En linea
              </p>
            }
          </article>
          <h3 class="text-sm font-bold my-1">Dashboard</h3>
          <ul class="flex flex-col gap-y-1 text-sm">
            @for (route of routes; track $index) {
              @let condition = activedUrl === route.path;
              <li>
                <a
                  class="flex gap-x-2 py-1 pl-2 pr-6 rounded-lg transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-500 group active:bg-indigo-200 font-medium items-center dark:hover:bg-indigo-800 dark:hover:text-indigo-500 dark:active:bg-indigo-900 dark:active:text-indigo-500"
                  routerLink="/admin/{{ route.path }}"
                  [ngClass]="{
                    'bg-indigo-200 text-indigo-500 dark:bg-indigo-900':
                      condition,
                    'text-stone-700 dark:text-stone-200': !condition,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 group-hover:fill-indigo-500 transition-colors duration-300"
                    viewBox="0 -960 960 960"
                    [ngClass]="{
                      'fill-indigo-500': condition,
                      'fill-stone-700 dark:fill-stone-200': !condition,
                    }"
                  >
                    <path [attr.d]="route.icon" />
                  </svg>
                  {{ route.path | titlecase }}
                </a>
              </li>
            }
          </ul>
        </nav>
        <section class="flex-1 py-2 px-6">
          <aside class="flex gap-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-7 fill-stone-700 dark:fill-stone-100"
              viewBox="0 -960 960 960"
            >
              <path
                d="M264-264h192v-120H264v120Zm0-168h192v-264H264v264Zm240 168h192v-264H504v264Zm0-312h192v-120H504v120ZM216-144q-29 0-50-21t-22-51v-528q0-30 22-51 21-21 50-21h528q29 0 51 21t21 51v72h96v72h-96v84h96v72h-96v84h96v72h-96v72q0 29-21 51t-51 21H216Zm0-72h528v-528H216v528Zm0-528v528-528Z"
              />
            </svg>
            <ul class="flex gap-x-1 text-sm items-center font-medium">
              <li><span>Admin ></span></li>
              <li>
                <span>{{ activedUrl | titlecase }}</span>
              </li>
            </ul>
          </aside>
          <ng-content />
        </section>
      </main>
    </div>
  `,
})
export class AdminLayout {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);
  private title: Title = inject(Title);
  private router: Router = inject(Router);
  public activedUrl: string = this.activatedRoute.snapshot.url[0].path;
  public user: Partial<Usuario> = {};
  public loading: boolean = true;
  public routes: { path: string; icon: string }[] = [
    {
      path: 'materias',
      icon: 'm480-144-16-2-16-6q-42-30-87-47t-97-17q-40 0-77 8t-72 22q-21 11-44-4t-23-39v-503q0-17 9-28t19-16q45-20 92-30t96-10q58 0 112 13t104 41v534q55-32 109-46t107-14q35 0 71 5t73 19v-528l22 8 22 8q11 5 20 17t8 27v503q0 26-22 39t-45 4q-35-14-72-22t-77-8q-51 0-97 17t-89 47l-14 6q-7 2-16 2Zm102-219q-9 8-19 4t-11-17v-312q0-15 6-29t17-24l161-143q9-8 21-4t11 17v311q0 15-6 29t-17 24L582-363Zm-174 95v-441q-34-20-73-27t-75-8q-39 0-73 9t-67 22v445q35-11 68-15t72-5q37 0 75 5t73 15Zm0 0v-441 441Z',
    },
    {
      path: 'estudiantes',
      icon: 'M216-258q-17-8-27-26t-10-38v-194L75-568q-10-5-15-13t-5-19q0-10 5-19t15-13l336-168 16-6 16-2 16 2 16 6 381 190q9 5 14 13t5 18v255q0 14-11 25t-25 11q-15 0-25-11t-11-25v-240l-96 48v194q0 20-9 38t-28 26l-195 98-16 6-16 1-16-1q-8-1-16-6l-195-98Zm227-207 271-135-271-135-271 135 271 135Zm0 239 192-95v-158l-157 78q-9 5-18 7-8 2-17 2-10 0-18-2t-17-7l-157-78v158l192 95Zm1-232Zm-1 116Zm0 0Z',
    },
    {
      path: 'matriculas',
      icon: 'M84-144q-15 0-26-10-10-11-10-26t10-25q11-11 26-11h792q15 0 26 10 10 11 10 26t-10 25q-11 11-26 11H84Zm84-120q-30 0-51-21t-21-51v-408q0-30 21-51t51-21h624q30 0 51 21t21 51v408q0 30-21 51t-51 21H168Zm0-72h624v-408H168v408Zm0 0v-408 408Z',
    },
  ];

  public ngOnInit(): void {
    this.title.setTitle(
      `${new TitleCasePipe().transform(this.activedUrl)} Dashboard • Sistema de Gestión de Matriculas`,
    );

    this.authService
      .profile()
      .subscribe({
        next: ({ usuario }) => (this.user = usuario),
        error: (error) => console.error(error),
      })
      .add(() => (this.loading = false));
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
