// Third party imports
import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';
// Local imports
import { SearchKeyword } from '../../interfaces/searchKeyword.interface';
import { UserService } from '../../services/userService.service';
import { CartStoreItem } from '../../store/cartStoreItem';
import { CategoriesStoreItem } from '../../store/categoriesStoreItem';

@Component({
  selector: 'header',
  imports: [FontAwesomeModule, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  readonly searchClicked = output<SearchKeyword>();

  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  displaySearch: boolean = true;
  isUserAuthenticated: boolean = false;
  userName: string = '';
  subscription: Subscription = new Subscription();

  constructor(
    public categoryStore: CategoriesStoreItem,
    public cartStoreItem: CartStoreItem,
    public userService: UserService,
    private readonly router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displaySearch = event.url === '/home/products';
      });

    this.subscription.add(
      this.userService.isUserAuthenticated$.subscribe(
        (isUserAuthenticated: boolean) => {
          this.isUserAuthenticated = isUserAuthenticated;
        }
      )
    );

    this.subscription.add(
      this.userService.loggedInUser$.subscribe((loggedInUser) => {
        this.userName = loggedInUser.firstName;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
