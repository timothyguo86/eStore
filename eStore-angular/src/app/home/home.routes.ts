// Third party import
import { Routes } from '@angular/router';
// Local import
import { ProductDetailsComponent } from './components/productDetails/productDetails.component';
import { ProductsGalleryComponent } from './components/productsGallery/productsGallery.component';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product',
        component: ProductDetailsComponent,
      },
    ],
  },
];
