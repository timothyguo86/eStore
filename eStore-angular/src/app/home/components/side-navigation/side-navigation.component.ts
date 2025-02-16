// Third party import
import { Component } from '@angular/core';
// Local import
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category.type';

@Component({
  selector: 'side-navigation',
  imports: [],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent {
  categories: Category[] = [];
  mainCategories: Category[] = [];
  subCategories: Category[] = [];

  constructor(categoryService: CategoryService) {
    this.categories = categoryService.getAllCategories();
    this.mainCategories = this.getCategories();
    this.subCategories = this.getCategories(this.mainCategories[0].id);
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(
      (category) => category.parent_category_id === parentCategoryId
    );
  }
}
