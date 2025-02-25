import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet />
  `,
})
export class AppComponent {
  constructor() {
    const isDark = localStorage.getItem('theme') === 'dark';
    document.body.classList.toggle('dark', isDark);
    this.setupThemeChangeListener();
  }

  private setupThemeChangeListener(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => {
        document.body.classList.toggle('dark', matches);
        localStorage.setItem('theme', matches ? 'dark' : 'light');
      });
  }
}
