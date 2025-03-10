// Third party import
import { Routes } from '@angular/router';
// Local imports
import { authGuard } from './services/authguard';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
    children: [
      // Default route
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/productsGallery/productsGallery.component').then(
            (m) => m.ProductsGalleryComponent,
          ),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./components/productDetails/productDetails.component').then(
            (m) => m.ProductDetailsComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent,
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/users/userSignup/userSignup.component').then(
            (m) => m.UserSignupComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/users/userLogin/userLogin.component').then(
            (m) => m.UserLoginComponent,
          ),
      },
      {
        path: 'pastorders',
        loadComponent: () =>
          import('./components/pastOrders/pastOrders.component').then(
            (m) => m.PastOrdersComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
