import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
})
export class AppComponent {
  public ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    const isDark = theme === 'dark';

    document.body.classList.toggle('dark', isDark);

    this.setupThemeChangeListener();
  }

  private setupThemeChangeListener(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        document.body.classList.toggle('dark', event.matches);
        localStorage.setItem('theme', event.matches ? 'dark' : 'light');
      });
  }
}
