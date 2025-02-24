// First party imports
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
// Local imports
import { CatNavigationComponent } from './components/catNavigation/catNavigation.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchKeyword } from './interfaces/searchKeyword.interface';
import { CategoriesStoreItem } from './store/categoriesStoreItem';
import { ProductsStoreItem } from './store/products.storeItem';

@Component({
  selector: 'home',
  imports: [HeaderComponent, CatNavigationComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly categoriesStoreItem: CategoriesStoreItem,
    private readonly productsStoreItem: ProductsStoreItem,
    private readonly router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.url === '/home') {
          router.navigate(['/home/products']);
        }
      });
  }

  ngOnInit(): void {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }

  onSelectCategory(categoryId: number) {
    this.productsStoreItem.loadProducts(`maincategoryid=${categoryId}`);
  }

  onSearchKeyword(searchKeyword: SearchKeyword) {
    this.productsStoreItem.loadProducts(
      `maincategoryid=${searchKeyword.categoryId}&keyword=${searchKeyword.keyword}`
    );
  }
}
