// Third party import
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
// Local import
import { StoreItem } from './storeItem';
import { Product } from '../interfaces/products.interface';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreItem extends StoreItem<Product[]> {
  constructor(private readonly productsService: ProductsService) {
    super([]);
  }

  async loadProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.setValue(products);
    });
  }

  get products$(): Observable<Product[]> {
    return this.value$;
  }
}
