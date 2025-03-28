// Third party import
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// Local import
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category.interface';
import { StoreItem } from './storeItem';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreItem extends StoreItem<Category[]> {
  constructor(private readonly categoryService: CategoryService) {
    super([]);
  }

  get categories$(): Observable<Category[]> {
    return this.value$;
  }

  get topLevelCategories$(): Observable<Category[]> {
    return this.value$.pipe(
      map((categories) =>
        categories.filter((category) => category.parent_category_id === null),
      ),
    );
  }

  async loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.setValue(categories);
    });
  }
}
