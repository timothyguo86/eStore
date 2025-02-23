// Third party import
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Local import
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/products.interface';
import { StoreItem } from './storeItem';

@Injectable({
  providedIn: 'root',
})
export class CartStoreItem extends StoreItem<Cart> {
  constructor() {
    super({
      product: [],
      totalAmount: 0,
      totalProducts: 0,
    });
  }

  get cart$(): Observable<Cart> {
    return this.value$;
  }

  get cart(): Cart {
    return this.value;
  }

  addProduct(product: Product): void {
    const cartProduct: CartItem | undefined = this.cart.product.find(
      (cartProduct) => cartProduct.product.id === product.id
    );

    if (!cartProduct) {
      this.cart.product.push(...this.cart.product, {
        product,
        quantity: 1,
        amount: product.price,
      });
    } else cartProduct.quantity += 1;

    this.cart.totalAmount += product.price;
    this.cart.totalProducts += 1;
  }
}
