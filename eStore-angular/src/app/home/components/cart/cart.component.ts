// Third party imports
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Local imports
import { CartItem } from '../../interfaces/cart.interface';
import { CartStoreItem } from '../../store/cartStoreItem';
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RatingsComponent, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  faTrash = faTrash;

  constructor(
    public cartStoreItem: CartStoreItem,
    private readonly router: Router,
  ) {}

  navigateToHome(): void {
    this.router.navigate(['/home/products']);
  }

  increaseQuantity(cartItem: CartItem): void {
    this.cartStoreItem.addProduct(cartItem.product);
  }

  decreaseQuantity(cartItem: CartItem): void {
    this.cartStoreItem.decreaseProductQuantity(cartItem);
  }

  removeItem(cartItem: CartItem): void {
    this.cartStoreItem.removeProduct(cartItem);
  }
}
