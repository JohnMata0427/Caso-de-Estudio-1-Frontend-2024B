import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="flex h-dvh items-center justify-center p-1.5">
      <img
        src="fondo.webp"
        alt="Authentication Image"
        class="rounded-lg h-full w-full object-cover sm:w-1/2"
      />
      <div
        class="grid place-items-center sm:w-1/2 sm:h-full sm:relative absolute bg-stone-100 dark:bg-stone-900 rounded-lg m-4 sm:m-0 inset-y-0"
      >
        <ng-content />
      </div>
    </main>
  `,
})
export class AuthLayout {}
