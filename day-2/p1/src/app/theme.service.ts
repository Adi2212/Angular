import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'easytask_theme';

  /**
   * Signal indicating whether dark mode is currently active.
   */
  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  /**
   * Toggle between light and dark themes.
   */
  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode());
  }

  /**
   * Set theme state directly and apply changes to DOM & localStorage.
   */
  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);

    if (typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
      } catch {
        // Fallback gracefully if storage is restricted
      }
    }
  }

  private initTheme(): void {
    if (typeof window === 'undefined') return;

    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem(this.STORAGE_KEY);
    } catch {
      // Storage unavailable
    }

    if (savedTheme) {
      this.setDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(prefersDark);
    }
  }
}
