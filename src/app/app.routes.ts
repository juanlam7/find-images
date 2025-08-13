import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/page/home').then((c) => c.Home),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./features/detail/page/detail').then((c) => c.Detail),
  },
];
