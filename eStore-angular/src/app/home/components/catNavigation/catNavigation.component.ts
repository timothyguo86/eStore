// Third party import
import { AsyncPipe } from '@angular/common';
import { Component, output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
// Local import
import { Category } from '../../interfaces/category.interface';
import { CategoriesStoreItem } from '../../store/categoriesStoreItem';

@Component({
  selector: 'cat-navigation',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './catNavigation.component.html',
  styleUrl: './catNavigation.component.scss',
})
export class CatNavigationComponent {
  readonly categoryClicked = output<number>();

  displayOptions: boolean = true;

  constructor(
    public categoryStore: CategoriesStoreItem,
    private readonly router: Router,
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displayOptions = event.url === '/home/products';
      });
  }

  onCategoryClicked(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
