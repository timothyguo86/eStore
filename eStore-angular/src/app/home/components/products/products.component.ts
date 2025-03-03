// First party import
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// Local import
import { Product } from '../../interfaces/products.interface';
import { CartStoreItem } from '../../store/cartStoreItem';
import { ProductsStoreItem } from '../../store/productsStoreItem';
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
  selector: 'products',
  imports: [
    CurrencyPipe,
    RatingsComponent,
    AsyncPipe,
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;

  constructor(
    public productsStore: ProductsStoreItem,
    private readonly cartStoreItem: CartStoreItem
  ) {}

  addToCart(product: Product): void {
    this.cartStoreItem.addProduct(product);
  }
}
