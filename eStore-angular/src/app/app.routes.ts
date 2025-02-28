// Third party import
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default route
  {
    path: '',
    redirectTo: '/home/products',
    pathMatch: 'full',
  },
  // Lazy loading home component
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((c) => c.HOME_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./notFound/notFound.component').then((m) => m.NotFoundComponent),
  },
];
