// First party import
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
// Local import
import { ProductsService } from '../../services/products.service';
import { RatingsComponent } from '../ratings/ratings.component';
import { Product } from './products.type';

@Component({
  selector: 'products',
  imports: [CurrencyPipe, RatingsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(productsService: ProductsService) {
    this.products = productsService.getProductsList();
  }
}
