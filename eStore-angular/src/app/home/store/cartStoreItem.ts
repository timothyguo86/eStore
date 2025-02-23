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
    const storedCart: any = sessionStorage.getItem('cart');
    // If there is a cart in the session storage, load it
    if (storedCart) {
      super(JSON.parse(storedCart));
    }
    // If there is no cart in the session storage, create a new cart
    else {
      super({
        products: [],
        totalAmount: 0,
        totalProducts: 0,
      });
    }
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
          amount: Number(product.price),
        },
      ];
    } else {
      cartProduct.quantity += 1;
      cartProduct.amount += Number(product.price);
    }

    this.cart.totalAmount += Number(product.price);
    this.cart.totalProducts += 1;

    this.saveCart();
  }

  removeProduct(cartItem: CartItem): void {
    this.cart.products = this.cart.products.filter(
      (product) => product.product.id !== cartItem.product.id
    );

    this.cart.totalProducts -= cartItem.quantity;
    this.cart.totalAmount -= cartItem.amount;

    if (this.cart.totalProducts === 0) {
      sessionStorage.clear();
    } else {
      this.saveCart();
    }
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
        this.saveCart();
      }
    }
  }

  private saveCart(): void {
    sessionStorage.clear();
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
