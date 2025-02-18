// Third party import
import { Component } from '@angular/core';
// Local import
import { categories } from './../../sampleData/categories.data';
import { CategoryService } from './../../services/category.service';
import { Category } from '../../types/category.type';

@Component({
  selector: 'cat-navigation',
  imports: [],
  templateUrl: './catNavigation.component.html',
  styleUrl: './catNavigation.component.scss',
})
export class CatNavigationComponent {
  categories: Category[] = categories;

  constructor(private readonly categoryService: CategoryService) {
    categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.filter(
        (category) => category.parent_category_id === null
      );
    });
  }
}
