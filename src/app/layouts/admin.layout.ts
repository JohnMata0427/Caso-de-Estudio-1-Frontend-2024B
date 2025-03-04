import { AuthService } from '@/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

type Route = { path: string; icon: string; iconFilled: string };

@Component({
  selector: 'admin-layout',
  imports: [RouterLink, NgClass, NgOptimizedImage, TitleCasePipe],
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
            viewBox="0 -960 960 960"
          >
            <path
              d="m144-264v-72h672v72zm0-180v-72h672v72zm0-180v-72h672v72z"
            />
          </svg>
        </button>
        <img
          ngSrc="icono.webp"
          alt="Icono de la aplicación"
          class="object-contain"
          width="24"
          height="24"
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
            viewBox="0 -960 960 960"
          >
            @if (isDarkMode()) {
              <path
                d="M480-360q50 0 85-35t35-85-35-85-85-35-85 35-35 85 35 85 85 35m0 72q-80 0-136-56t-56-136 56-136 136-56 136 56 56 136-56 136-136 56M216-444H48v-72h168zm696 0H744v-72h168zM444-744v-168h72v168zm0 696v-168h72v168zM269-642 166-742l51-55 102 104zm474 475L642-268l49-51 103 101zM640-691l102-101 51 49-100 103zM163-217l105-99 49 47-98 104zm317-263"
              />
            } @else {
              <path
                d="M480-144q-140 0-238-98t-98-238 98-238 238-98l25 1 26 3q-39 29-62 72t-23 92q0 85 59 144t143 58q49 0 92-23t72-62l3 26 1 25q0 140-98 238t-238 98m0-72q82 0 149-47t98-123l-40 9q-19 3-39 3-114 0-194-80t-80-194q0-20 4-39l8-40q-76 31-123 98t-47 149q0 110 77 187t187 77m-14-250"
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
            viewBox="0 -960 960 960"
          >
            <path
              d="M216-144q-30 0-51-21t-21-51v-528q0-30 21-51t51-21h264v72H216v528h264v72zm432-168-51-51 81-81H384v-72h294l-81-81 51-51 168 168z"
            />
          </svg>
        </button>
      </div>
    </header>
    <main class="flex flex-1">
      <nav
        class="px-6 py-4 border-r border-stone-300 dark:border-stone-800 lg:static bg-stone-100 dark:bg-stone-900 flex flex-col z-10 fixed"
        [ngClass]="{
          'animate-slide-out-left': !showNav(),
          'animate-slide-in-right lg:animate-none': showNav(),
        }"
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
              viewBox="0 -960 960 960"
            >
              <path
                d="M480-62q-87 0-163-33t-133-89q-56-57-89-133T62-480t33-163 89-133q57-57 133-89 76-33 163-33 25 0 42 17t17 42q0 24-17 42t-42 17q-125 0-212 87-88 87-88 212t88 214q87 87 212 87 126 0 213-88 87-87 87-212 0-25 17-42t42-17 42 17 17 42q0 87-33 163t-89 133q-57 57-133 89-76 33-163 33"
              />
            </svg>
            <p class="text-xs font-medium mt-1">Cargando...</p>
          } @else {
            <!-- Admin Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-8 mx-auto fill-stone-800 dark:fill-stone-100"
              viewBox="0 -960 960 960"
            >
              <path
                d="M480-408q60 0 102-42t42-102-42-102-102-42-102 42-42 102 42 102 102 42m0 237q58-18 104-57t80-91q-43-20-89-30t-95-11q-48 0-94 11t-90 30q34 51 80 91t104 57m0 71h-12q-6 0-11-3-131-43-210-159t-79-253v-180q0-23 13-41t33-26l240-92q13-5 26-5t26 5l240 92q21 8 34 26t12 41v180q0 137-79 253T503-103l-11 3z"
              />
            </svg>
            <strong class="text-sm font-medium">
              {{ userResource.value()?.usuario?.nombre }}
              {{ userResource.value()?.usuario?.apellido }}
            </strong>
            <small class="text-[10px] text-stone-700 dark:text-stone-300">
              {{ userResource.value()?.usuario?.email }}
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
            @let condition = activedUrl() === route.path;
            <li>
              <a
                class="flex gap-x-2 py-1 pl-2 pr-6 rounded-lg transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-500 group active:bg-indigo-200 font-medium items-center dark:hover:bg-indigo-950 dark:active:bg-indigo-900"
                routerLink="/admin/{{ route.path }}"
                [ngClass]="{
                  'bg-indigo-100 text-indigo-500 dark:bg-indigo-950': condition,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5 group-hover:fill-indigo-500 transition-colors duration-300"
                  viewBox="0 -960 960 960"
                  [ngClass]="{
                    'fill-indigo-500': condition,
                    'fill-stone-800 dark:fill-stone-100': !condition,
                  }"
                >
                  <path [attr.d]="condition ? route.iconFilled : route.icon" />
                </svg>
                {{ route.path | titlecase }}
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

        <ng-content />
      </section>
    </main>
  `,
})
export class AdminLayout {
  public readonly routes = signal<Route[]>([
    {
      path: 'estudiantes',
      icon: 'M480-144 216-276v-240L48-600l432-216 432 216v312h-72v-276l-96 48v240zm0-321 271-135-271-135-271 135zm0 240 192-96v-159l-192 96-192-96v159zm0-159',
      iconFilled:
        'M840-288v-276L480-384 48-600l432-216 432 216v312zM480-144 216-276v-159l264 132 264-132v159z',
    },
    {
      path: 'materias',
      icon: 'M324-96q-55 0-93-39-39-38-39-93v-504q0-55 39-93 38-39 93-39h444v575q-25 0-42 18t-18 43q0 26 18 44 17 17 42 17v71zm-60-250q14-7 29-10t31-4h12v-432h-12q-25 0-42 18t-18 42zm144-14h288v-432H408zm-144 14v-446zm60 178h326q-7-14-10-28t-4-31q0-17 4-32t11-29H324q-26 0-43 18t-17 42q0 26 17 43t43 17',
      iconFilled:
        'M324-96q-55 0-93-39-39-38-39-93v-504q0-55 39-93 38-39 93-39h444v575q-25 0-42 18t-18 43q0 26 18 44 17 17 42 17v71zm12-264h72v-432h-72zm-12 192h326q-7-14-10-28t-4-31q0-17 4-32t11-29H324q-26 0-43 18t-17 42q0 26 17 43t43 17',
    },
    {
      path: 'matriculas',
      icon: 'M528-432h216v-72H528zm0-120h216v-72H528zM192-336h288v-45q0-29-44-52t-100-23q-57 0-100 23t-44 52zm144-144q30 0 51-21t21-51-21-51-51-21-51 21-21 51 21 51 51 21M168-192q-30 0-51-21t-21-51v-432q0-30 21-51t51-21h624q30 0 51 21t21 51v432q0 30-21 51t-51 21zm0-72h624v-432H168zm0 0v-432z',
      iconFilled:
        'M528-432h216v-72H528zm0-120h216v-72H528zM192-336h288v-45q0-29-44-52t-100-23q-57 0-100 23t-44 52zm144-144q30 0 51-21t21-51-21-51-51-21-51 21-21 51 21 51 51 21M168-192q-30 0-51-21t-21-51v-432q0-30 21-51t51-21h624q30 0 51 21t21 51v432q0 30-21 51t-51 21z',
    },
  ]).asReadonly();
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly authService: AuthService = inject(AuthService);
  private readonly title: Title = inject(Title);
  private readonly breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);
  public readonly showNav = signal<boolean>(true);
  public readonly isDarkMode = signal<boolean>(
    localStorage.getItem('theme') === 'dark',
  );
  public readonly activedUrl = computed<string>(
    () => this.activatedRoute.snapshot.url[0].path,
  );
  public readonly userResource = rxResource({
    loader: () => this.authService.profile(),
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

  public toggleNav = (): void => this.showNav.update((state) => !state);

  public logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }

  public toggleDarkMode(): void {
    this.isDarkMode.update((state) => !state);
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    document.body.classList.toggle('dark', this.isDarkMode());
  }
}
