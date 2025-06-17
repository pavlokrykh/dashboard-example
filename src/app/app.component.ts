import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '@core/services/login.service';
import { NavbarComponent, NavigationTab } from './layout/navbar/navbar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly loginService = inject(LoginService);

  readonly navigationTabs: NavigationTab[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'home' },
    { label: 'Accounts', route: '/account', icon: 'accounts' },
    { label: 'Brokers', route: '/brokers', icon: 'brokers' },
    { label: 'Submissions', route: '/submissions', icon: 'submissions' },
    { label: 'Organizations', route: '/organizations', icon: 'organizations' },
    { label: 'Goals & Rules', route: '/goals-rules' },
    { label: 'Reports', route: '/reports' },
    { label: 'Analytics', route: '/analytics' },
    { label: 'Policies', route: '/policies' },
    { label: 'Claims', route: '/claims' },
    { label: 'Underwriting', route: '/underwriting' },
    { label: 'Risk Assessment', route: '/risk-assessment' },
    { label: 'Market Intelligence', route: '/market-intelligence' },
    { label: 'Portfolio Management', route: '/portfolio-management' },
    { label: 'Communications', route: '/communications' },
    { label: 'Documents', route: '/documents' },
    { label: 'Settings', route: '/settings' },
    { label: 'Administration', route: '/admin' },
    { label: 'User Management', route: '/user-management' },
    { label: 'Audit Logs', route: '/audit-logs' },
  ];

  constructor() {
    this.loginService.login().pipe(takeUntilDestroyed()).subscribe();
  }
}
