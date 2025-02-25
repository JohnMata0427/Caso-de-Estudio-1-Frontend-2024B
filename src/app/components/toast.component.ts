import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'toast-component',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (opened()) {
      <div
        class="fixed bottom-8 sm:right-8 p-2 rounded-lg text-sm font-semibold justify-between border-l-4"
        [ngClass]="{
          'bg-emerald-200 text-emerald-400 border-emerald-400 dark:bg-emerald-900':
            success(),
          'bg-red-200 text-red-400 border-red-400 dark:bg-red-900':
            !success(),
          'animate-slide-in-bottom': isClosedAnimate(),
          'animate-slide-out-top': !isClosedAnimate(),
        }"
      >
        {{ message() }}
      </div>
    }
  `,
})
export class ToastComponent {
  public readonly success = input.required<boolean>();
  public readonly message = input.required<string>();
  public readonly opened = model.required<boolean>();
  public readonly isClosedAnimate = signal<boolean>(true);

  constructor() {
    effect(() => {
      if (this.opened()) {
        this.isClosedAnimate.set(true);
        setTimeout(() => {
          this.isClosedAnimate.set(false);
          setTimeout(() => this.opened.set(false), 640);
        }, 3000);
      }
    });
  }
}
