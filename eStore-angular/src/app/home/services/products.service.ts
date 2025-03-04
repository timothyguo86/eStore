// First party import
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Local import
import { Product } from '../interfaces/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  getAllProducts(query?: string): Observable<Product[]> {
    let url = 'http://localhost:5001/products';
    if (query) url += `?${query}`;
    return this.http.get<Product[]>(url);
  }
}
