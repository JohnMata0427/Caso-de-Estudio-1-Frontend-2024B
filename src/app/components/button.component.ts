import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'button-component',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="text-stone-100 rounded-lg transition-colors cursor-pointer font-semibold border-b-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 disabled:bg-indigo-100 dark:disabled:bg-indigo-900 border-indigo-600 hover:border-indigo-700 active:border-indigo-800 disabled:border-indigo-200 dark:disabled:border-indigo-950 disabled:cursor-wait"
      [ngClass]="moreStyles()"
      [disabled]="disabled()">
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  public readonly moreStyles = input<string>();
  public readonly disabled = input<boolean>(false);
}
