import { Routes } from '@angular/router';
import { NotFoundComponent } from './notFound/notFound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Lazy loading home component
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((c) => c.HOME_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
