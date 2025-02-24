// Third party imports
import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
// Local imports
import { SearchKeyword } from '../../interfaces/searchKeyword.interface';
import { CartStoreItem } from '../../store/cartStoreItem';
import { CategoriesStoreItem } from '../../store/categoriesStoreItem';

@Component({
  selector: 'header',
  imports: [FontAwesomeModule, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;

  @Output()
  searchClicked: EventEmitter<SearchKeyword> =
    new EventEmitter<SearchKeyword>();

  displaySearch: boolean = true;

  constructor(
    public categoryStore: CategoriesStoreItem,
    public cartStoreItem: CartStoreItem,
    private readonly router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displaySearch = event.url === '/home/products';
      });
  }

  onClickSearch(keyword: string, categoryId: string) {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword,
    });
  }

  navigateToCart(): void {
    this.router.navigate(['/home/cart']);
  }
}
