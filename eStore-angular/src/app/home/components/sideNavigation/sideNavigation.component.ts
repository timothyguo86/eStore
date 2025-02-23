// Third party import
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
// Local import
import { CategoriesStoreItem } from '../../store/categoriesStoreItem';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'side-navigation',
  imports: [],
  templateUrl: './sideNavigation.component.html',
  styleUrl: './sideNavigation.component.scss',
})
export class SideNavigationComponent implements OnDestroy {
  @Output()
  subCategoryClicked: EventEmitter<number> = new EventEmitter<number>();

  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private readonly categoryStoreItem: CategoriesStoreItem) {
    this.subscriptions.add(
      categoryStoreItem.categories$.subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter((category) =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : category.parent_category_id === null
    );
  }

  onSubCategoryClicked(subCategory: Category): void {
    this.subCategoryClicked.emit(subCategory.id);
  }
}
