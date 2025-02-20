// Third party import
import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
// Local import
import { Category } from '../../interfaces/category.interface';
import { CategoriesStoreItem } from '../../store/categoriesStoreItem';

@Component({
  selector: 'cat-navigation',
  imports: [AsyncPipe],
  templateUrl: './catNavigation.component.html',
  styleUrl: './catNavigation.component.scss',
})
export class CatNavigationComponent {
  constructor(public categoryStore: CategoriesStoreItem) {}

  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>();

  onCategoryClicked(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
