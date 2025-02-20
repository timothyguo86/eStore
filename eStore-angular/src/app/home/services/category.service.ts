// Third party import
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Local import
import { Category } from '../interface/category.type';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5001/productCategories');
  }
}
