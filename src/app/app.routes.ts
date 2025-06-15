import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@dashboard/view//page/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'account',
    loadComponent: () => import('@account/view/page/account.component').then((m) => m.AccountComponent),
  },
];
