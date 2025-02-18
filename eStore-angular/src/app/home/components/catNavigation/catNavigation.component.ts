// Third party import
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
// Local import
import { CategoriesStoreItem } from '../../store/categoriesStoreItem';

@Component({
  selector: 'cat-navigation',
  imports: [AsyncPipe],
  templateUrl: './catNavigation.component.html',
  styleUrl: './catNavigation.component.scss',
})
export class CatNavigationComponent {
  constructor(public categoryStore: CategoriesStoreItem) {}
}
