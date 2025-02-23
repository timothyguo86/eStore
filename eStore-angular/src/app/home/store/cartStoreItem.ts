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
      products: [],
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
    const cartProduct: CartItem | undefined = this.cart.products.find(
      (cartProduct) => cartProduct.product.id === product.id
    );

    if (!cartProduct) {
      this.cart.products = [
        ...this.cart.products,
        {
          product,
          quantity: 1,
          amount: product.price,
        },
      ];
    } else {
      cartProduct.quantity += 1;
      cartProduct.amount += product.price;
    }

    this.cart.totalAmount += product.price;
    this.cart.totalProducts += 1;
  }

  removeProduct(cartItem: CartItem): void {
    this.cart.products = this.cart.products.filter(
      (product) => product.product.id !== cartItem.product.id
    );

    this.cart.totalProducts -= cartItem.quantity;
    this.cart.totalAmount -= cartItem.amount;
  }

  decreaseProductQuantity(cartItem: CartItem): void {
    const cartProduct = this.cart.products.find(
      (product) => product.product.id === cartItem.product.id
    );

    if (cartProduct) {
      if (cartProduct.quantity === 1) {
        this.removeProduct(cartProduct);
      } else {
        cartProduct.quantity -= 1;
        this.cart.totalProducts -= 1;
        this.cart.totalAmount -= cartProduct.product.price;
      }
    }
  }
}
