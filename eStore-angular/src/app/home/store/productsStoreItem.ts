// Third party import
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Local import
import { Product } from '../interfaces/products.interface';
import { ProductsService } from '../services/products.service';
import { StoreItem } from './storeItem';

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreItem extends StoreItem<Product[]> {
  constructor(private readonly productsService: ProductsService) {
    super([]);
  }

  async loadProducts(query?: string) {
    this.productsService.getAllProducts(query).subscribe((products) => {
      this.setValue(products);
    });
  }

  get products$(): Observable<Product[]> {
    return this.value$;
  }
}
