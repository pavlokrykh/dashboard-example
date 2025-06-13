import { Routes } from '@angular/router';
import { loginResolver } from '@core/resolvers/login.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    resolve: [loginResolver],
    loadComponent: () => import('@dashboard/view//page/dashboard.component').then((m) => m.DashboardComponent),
  },
];
