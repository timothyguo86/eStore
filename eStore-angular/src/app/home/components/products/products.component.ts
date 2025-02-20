// First party import
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
// Local import
import { RatingsComponent } from '../ratings/ratings.component';
import { ProductsStoreItem } from '../../store/products.storeItem';

@Component({
  selector: 'products',
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productsStore: ProductsStoreItem) {}
}
