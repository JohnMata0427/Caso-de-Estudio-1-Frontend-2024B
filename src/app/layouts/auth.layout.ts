import { Component } from '@angular/core';

@Component({
  selector: 'auth-layout',
  template: `
    <main class="flex h-screen items-center justify-center p-1.5">
      <img
        src="fondo.webp"
        alt="Authentication Image"
        class="rounded-lg h-full object-cover sm:w-1/2"
      />
      <div
        class="grid place-items-center sm:w-1/2 sm:h-full sm:relative absolute bg-white dark:bg-stone-900 rounded-lg m-4 inset-y-0"
      >
        <ng-content />
      </div>
    </main>
  `,
})
export class AuthLayout {}
