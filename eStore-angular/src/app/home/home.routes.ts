// Third party import
import { Routes } from '@angular/router';
// Local import
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/productDetails/productDetails.component';
import { ProductsGalleryComponent } from './components/productsGallery/productsGallery.component';
import { UserSignupComponent } from './components/users/userSignup/userSignup.component';
import { HomeComponent } from './home.component';
import { UserLoginComponent } from './components/users/userLogin/userLogin.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // Default route
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'signup',
        component: UserSignupComponent,
      },
      {
        path: 'login',
        component: UserLoginComponent,
      },
    ],
  },
];
