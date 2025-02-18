import { NgClass } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'toast-component',
  imports: [NgClass],
  template: `
    @if (message()) {
      <div
        class="fixed bottom-8 sm:right-8 p-2 rounded-lg text-sm font-semibold animate-slide-in-bottom flex justify-between border-l-4"
        [ngClass]="{
          'bg-green-200 text-green-500 border-green-400': success,
          'bg-red-200 text-red-500 border-red-400': !success,
          'animate-slide-out-top': closedAnimate,
        }"
      >
        {{ message() }}
        <button class="cursor-pointer" (click)="closeToast()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            viewBox="0 -960 960 960"
            [ngClass]="{
              'fill-green-500': success,
              'fill-red-500': !success,
            }"
          >
            <path
              d="M480-397 332-249q-18 18-41 18t-41-19q-18-18-18-41t18-42l147-147-148-148q-18-18-17-41t18-42q18-18 42-18t41 18l147 148 148-148q18-18 42-18t41 18q18 18 18 42t-18 41L563-480l148 148q18 18 18 41t-18 41q-18 18-41 18t-42-18L480-397Z"
            />
          </svg>
        </button>
      </div>
    }
  `,
})
export class ToastComponent {
  public message = model.required<string>();
  public readonly type = input<'success' | 'error'>();
  public readonly success: boolean = this.type() === 'success';
  public closedAnimate: boolean = false;

  public closeToast(): void {
    this.closedAnimate = true;
    setTimeout(() => {
      this.message.update(() => '');
      this.closedAnimate = false;
    }, 500);
  }
}
