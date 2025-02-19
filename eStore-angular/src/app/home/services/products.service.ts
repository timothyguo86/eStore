// First party import
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Local import
import { Product } from '../components/products/products.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:5001/products');
  }
}
