// Third party import
import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// Local import
import { Product } from '../../interfaces/products.interface';
import { ProductsStoreItem } from '../../store/products.storeItem';
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
  selector: 'product-details',
  imports: [RatingsComponent, CurrencyPipe],
  templateUrl: './productDetails.component.html',
  styleUrl: './productDetails.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  product?: Product;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly productsStoreItem: ProductsStoreItem
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activateRoute.snapshot.paramMap.get('id'));

    this.subscriptions.add(
      this.productsStoreItem.products$.subscribe((products) => {
        this.product = products.find((product) => product.id === id) as Product;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
