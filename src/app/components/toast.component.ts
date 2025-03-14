import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'toast-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (opened()) {
      <div
        class="fixed bottom-8 sm:right-8 p-2 rounded-lg text-sm font-semibold flex flex-col border-l-4"
        [class]="
          success()
            ? 'bg-emerald-100 text-emerald-400 border-emerald-400 dark:bg-emerald-900'
            : 'bg-red-100 text-red-400 border-red-400 dark:bg-red-900'
        "
        [class.animate-slide-in-bottom]="isClosedAnimate()"
        [class.animate-slide-out-top]="!isClosedAnimate()"
      >
        @for (item of messages(); track $index) {
          <span>{{ emoji() }} {{ item }}</span>
        }
      </div>
    }
  `,
})
export class ToastComponent {
  public readonly success = input.required<boolean>();
  public readonly messages = input.required<string[]>();
  public readonly opened = model.required<boolean>();
  public readonly isClosedAnimate = signal<boolean>(true);
  public readonly emoji = computed(() => (this.success() ? '✅' : '⛔'));

  constructor() {
    effect(() => {
      if (this.opened()) {
        this.isClosedAnimate.set(true);
        setTimeout(() => {
          this.isClosedAnimate.set(false);
          setTimeout(() => this.opened.set(false), 640);
        }, 5000);
      }
    });
  }
}
