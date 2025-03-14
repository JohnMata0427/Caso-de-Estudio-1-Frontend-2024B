import { NAVIGATION_ROUTES } from '@/constants/navigation.constant';
import { AuthService } from '@/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'admin-layout',
  imports: [RouterLink, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="py-2 px-6 border-b border-stone-300 dark:border-stone-800 flex justify-between items-center"
    >
      <div class="flex gap-x-3 items-center">
        <button
          class="border border-stone-300 dark:border-stone-700 rounded-lg p-1 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          (click)="toggleNav()"
        >
          <!-- Menu Hamburger Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 fill-stone-800 dark:fill-stone-100"
            viewBox="0 0 24 24"
          >
            <path d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
          </svg>
        </button>
        <img
          src="icono.webp"
          alt="Icono de la aplicación"
          class="object-contain size-6"
        />
        <h1 class="font-semibold text-xs sm:block">
          Sistema de Gestión de Matriculas
        </h1>
      </div>
      <div class="flex gap-x-3 items-center">
        <button
          class="border rounded-lg p-1 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer border-stone-300 dark:border-stone-700"
          (click)="toggleDarkMode()"
        >
          <!-- Sun and Moon Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 fill-stone-800 dark:fill-stone-100"
            viewBox="0 0 24 24"
          >
            @if (isDarkMode()) {
              <path
                d="M12 15q1.3 0 2.1-.9T15 12t-.9-2.1T12 9t-2.1.9T9 12t.9 2.1 2.1.9m0 2q-2 0-3.5-1.5T7 12t1.5-3.5T12 7t3.5 1.5T17 12t-1.5 3.5T12 17m-7-4H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.7 3.9 5.3 5.3 4l2.4 2.5zm12.3 12.4-2.4-2.5 1.3-1.4 2.5 2.5zM16.3 6.4l2.4-2.5L20 5.3l-2.5 2.4zM3.8 18.7l2.6-2.4 1.3 1.3-2.4 2.5zM12 12"
              />
            } @else {
              <path
                d="M12 21q-3.8 0-6.4-2.6T3 12t2.6-6.4T12 3h.7l.7.1q-1 .7-1.7 1.9t-.6 2.5q0 2.3 1.6 3.8t3.8 1.6q1.4 0 2.5-.6t1.9-1.7v.7l.1.7q0 3.8-2.6 6.4T12 21m0-2q2.2 0 4-1.2t2.5-3.2l-1 .2-1 .1q-3 0-5.2-2.2T9 7.5v-1q0-.5.3-1-2 .8-3.2 2.5T5 12q0 2.9 2 5t5 2m-.3-6.8"
              />
            }
          </svg>
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-600 hover:border-red-700 active:border-red-800 text-stone-100 rounded-lg transition-colors cursor-pointer font-semibold border-b-3 py-1 px-3 text-xs flex items-center gap-x-2"
          (click)="logout()"
        >
          Salir
          <!-- Logout Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 fill-stone-100"
            viewBox="0 0 24 24"
          >
            <path
              d="m17 7-1.4 1.4 2.6 2.6H8v2h10.2l-2.6 2.6L17 17l5-5M4 5h8V3H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
            />
          </svg>
        </button>
      </div>
    </header>
    <main class="flex flex-1">
      <nav
        class="px-6 py-4 border-r border-stone-300 dark:border-stone-800 lg:static bg-stone-100 dark:bg-stone-900 flex flex-col z-10 fixed"
        [class]="
          showNav()
            ? 'animate-slide-in-right lg:animate-none'
            : 'animate-slide-out-left'
        "
      >
        <h3 class="text-sm font-bold">Bienvenido</h3>
        <article
          class="flex flex-col items-center justify-center my-5 h-22 w-40"
        >
          @if (userResource.isLoading()) {
            <!-- Spinner Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-indigo-500 size-5 animate-spin opacity-90"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2a10 10 0 0 0 0 20v-3a7 7 0 1 1 7-7h3c0-5-5-10-10-10"
              />
            </svg>
            <p class="text-xs font-medium mt-1">Cargando perfil...</p>
          } @else {
            <!-- Admin Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-8 mx-auto fill-stone-800 dark:fill-stone-100"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 1 3 5v6c0 6 4 11 9 12 5-1 9-6 9-12V5Zm0 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3m0 8c2 0 6 1 6 3a7 7 0 0 1-12 0c0-2 4-3 6-3"
              />
            </svg>
            @let user = userResource.value().usuario;
            <strong class="text-sm font-medium">
              {{ user.nombre }}
              {{ user.apellido }}
            </strong>
            <small class="text-[10px] text-stone-700 dark:text-stone-300">
              {{ user.email }}
            </small>
            <p class="text-xs mt-1">
              <span class="text-emerald-500">•</span>
              En linea
            </p>
          }
        </article>
        <h3 class="text-sm font-bold my-1">Dashboard</h3>
        <ul class="flex flex-col gap-y-1 text-sm">
          @for (route of routes(); track $index) {
            @let path = route.path;
            @let condition = activedUrl() === path;
            <li>
              <a
                class="flex gap-x-2 py-1 pl-2 pr-6 rounded-lg transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-500 group active:bg-indigo-200 font-medium items-center dark:hover:bg-indigo-950 dark:active:bg-indigo-900"
                routerLink="/admin/{{ path }}"
                [class]="
                  condition
                    ? 'bg-indigo-100 text-indigo-500 dark:bg-indigo-950'
                    : ''
                "
              >
                <!-- Student, Book, and Inscription Icons -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 group-hover:fill-indigo-500 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  [class]="
                    condition
                      ? 'fill-indigo-500'
                      : 'fill-stone-800 dark:fill-stone-100'
                  "
                >
                  <path [attr.d]="condition ? route.iconFilled : route.icon" />
                </svg>
                {{ path | titlecase }}
              </a>
            </li>
          }
        </ul>
      </nav>
      <section class="py-4 px-6 flex flex-col w-full gap-y-4">
        <img
          src="banner.webp"
          alt="Fondo de la aplicación"
          class="object-cover h-20 sm:h-40 w-full rounded-lg object-left"
        />
        <aside class="flex gap-x-2 items-center font-medium text-sm">
          <!-- Dashboard Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6 fill-stone-800 dark:fill-stone-100"
            viewBox="0 0 24 24"
          >
            <path d="M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3z" />
          </svg>
          <h2>Dashboard de {{ activedUrl() | titlecase }}</h2>
        </aside>
        <ng-content />
      </section>
    </main>
  `,
})
export class AdminLayout {
  private readonly authService: AuthService = inject(AuthService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly title: Title = inject(Title);
  private readonly breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);
  public readonly routes = signal(NAVIGATION_ROUTES).asReadonly();
  public readonly activedUrl = signal<string>(
    this.activatedRoute.snapshot.url[0].path,
  ).asReadonly();
  public readonly isDarkMode = signal<boolean>(
    localStorage.getItem('theme') === 'dark',
  );
  public readonly showNav = signal<boolean>(true);
  public readonly userResource = rxResource({
    loader: () => this.authService.profile(),
    defaultValue: { response: '', usuario: {} },
  });

  constructor() {
    this.title.setTitle(
      `${new TitleCasePipe().transform(this.activedUrl())} Dashboard • Sistema de Gestión de Matriculas`,
    );

    const { Medium, Large, XLarge } = Breakpoints;
    this.breakpointObserver.observe([Medium, Large, XLarge]).subscribe({
      next: ({ matches }) => this.showNav.set(matches),
    });
  }

  public toggleNav = (): void => this.showNav.update(state => !state);

  public logout(): void {
    localStorage.removeItem('token');
    location.reload();
  }

  public toggleDarkMode(): void {
    this.isDarkMode.update(state => !state);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    document.body.classList.toggle('dark', this.isDarkMode());
  }
}
