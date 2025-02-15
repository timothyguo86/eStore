// First party imports
import { Component } from '@angular/core';
// Local imports
import { HeaderComponent } from './components/header/header.component';
import { CatNavigationComponent } from './components/catNavigation/catNavigation.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'home',
  imports: [
    HeaderComponent,
    CatNavigationComponent,
    SideNavigationComponent,
    ProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
