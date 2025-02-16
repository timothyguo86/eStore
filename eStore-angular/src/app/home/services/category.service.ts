// Third party import
import { Injectable } from '@angular/core';
// Local import
import { Category } from '../types/category.type';
import { categories } from '../sampleData/categories.data';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getAllCategories(): Category[] {
    return categories;
  }
}
