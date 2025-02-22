// First party import
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// Local import
import { ProductsStoreItem } from '../../store/products.storeItem';
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
  selector: 'products',
  imports: [CurrencyPipe, RatingsComponent, AsyncPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productsStore: ProductsStoreItem) {}
}
