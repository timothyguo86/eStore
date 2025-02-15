// First party import
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
// Local import
import { ProductsService } from '../../services/products.service';
import { ProductListItem } from './products.type';

@Component({
  selector: 'products',
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: ProductListItem[] = [];

  constructor(productsService: ProductsService) {
    this.products = productsService.getProductsList();
  }
}
