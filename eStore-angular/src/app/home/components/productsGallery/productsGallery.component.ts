// Third Party Imports
import { Component } from '@angular/core';
// Local Imports
import { ProductsStoreItem } from '../../store/productsStoreItem';
import { ProductsComponent } from '../products/products.component';
import { SideNavigationComponent } from '../sideNavigation/sideNavigation.component';

@Component({
  selector: 'products-gallery',
  imports: [SideNavigationComponent, ProductsComponent],
  templateUrl: './productsGallery.component.html',
  styleUrl: './productsGallery.component.scss',
})
export class ProductsGalleryComponent {
  constructor(private readonly productsStoreItem: ProductsStoreItem) {}

  onSelectSubCategory(subCategoryId: number) {
    this.productsStoreItem.loadProducts(`subcategoryid=${subCategoryId}`);
  }
}
