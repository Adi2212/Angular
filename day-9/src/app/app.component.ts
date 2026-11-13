import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar.component';
import { SidebarComponent } from './shared/components/sidebar.component';
import { FooterComponent } from './shared/components/footer.component';
import { ToastContainerComponent } from './shared/components/toast-container.component';
import { ThemeToggleComponent } from './shared/components/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    SidebarComponent,
    FooterComponent, 
    ToastContainerComponent,
    ThemeToggleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private router = inject(Router);

  title = 'AgriSell';
  isSidebarOpen = signal<boolean>(false);
  currentUrl = signal<string>('/');

  // Routes that render standalone without the sidebar/navbar
  isStandaloneRoute = computed(() => {
    const url = this.currentUrl();
    const standalonePaths = [
      '/login', 
      '/register', 
      '/admin/login', 
      '/addAddress', 
      '/payment/success', 
      '/payment/cancel'
    ];
    return standalonePaths.some(p => url === p || url.startsWith(p + '?'));
  });

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl.set(event.urlAfterRedirects || event.url);
      this.isSidebarOpen.set(false);
      window.scrollTo(0, 0);
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }
}
