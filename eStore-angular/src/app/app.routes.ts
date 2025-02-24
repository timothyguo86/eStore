import { Routes } from '@angular/router';
import { NotFoundComponent } from './notFound/notFound.component';

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
    component: NotFoundComponent,
  },
];
