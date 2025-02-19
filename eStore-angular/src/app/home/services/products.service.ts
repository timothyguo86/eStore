// First party import
import { Injectable } from '@angular/core';
// Local import
import { Product } from '../components/products/products.type';
import { products } from '../sampleData/products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProductsList(): Product[] {
    return products;
  }
}
