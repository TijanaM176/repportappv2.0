import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ReportApp');
  isLoginRoute = false;

  navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Report Page', path: '/report-page' }
  ];

  constructor(private router: Router) {
    this.isLoginRoute = this.router.url.startsWith('/login');

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEvent = event as NavigationEnd;
        this.isLoginRoute = navEvent.urlAfterRedirects.startsWith('/login');
      });
  }
}
