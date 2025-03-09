// Third party imports
import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
// Local imports
import { CartItem, DeliveryAddress } from '../../interfaces/cart.interface';
import { CartStoreItem } from '../../store/cartStoreItem';
import { RatingsComponent } from '../ratings/ratings.component';
import { LoggedInUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    RatingsComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  faTrash: IconDefinition = faTrash;
  orderForm: FormGroup = new FormGroup({});
  user: LoggedInUser;
  subscription: Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;

  constructor(
    public cartStoreItem: CartStoreItem,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly orderService: OrderService,
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      email: '',
    };

    this.subscription.add(
      userService.loggedInUser$.subscribe((loggedInUser: LoggedInUser) => {
        if (loggedInUser.firstName) this.user = loggedInUser;
      }),
    );
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [
        `${this.user.firstName} ${this.user.lastName}`,
        Validators.required,
      ],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      pin: [this.user.pin, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.userService.isUserAuthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value,
      };

      this.subscription.add(
        this.orderService
          .saveOrder(deliveryAddress, this.user.email)
          .subscribe({
            next: (result) => {
              this.cartStoreItem.clearCart();
              this.alertType = 0;
              this.alertMessage = 'Order placed successfully!';
              this.disableCheckout = true;
            },
            error: (error) => {
              this.alertType = 2;
              if (error.error.message === 'Authentication Failed!') {
                this.alertMessage = 'Please login to place order!';
              } else {
                this.alertMessage = error.error.message;
              }
            },
          }),
      );
    }
  }

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
