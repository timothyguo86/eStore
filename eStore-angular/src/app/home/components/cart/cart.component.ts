// Third party imports
import { CurrencyPipe } from '@angular/common';
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
import { CartItem } from '../../interfaces/cart.interface';
import { CartStoreItem } from '../../store/cartStoreItem';
import { RatingsComponent } from '../ratings/ratings.component';
import { LoggedInUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    RatingsComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  faTrash: IconDefinition = faTrash;
  orderForm: FormGroup = new FormGroup({});
  user: LoggedInUser;
  subscription: Subscription = new Subscription();

  constructor(
    public cartStoreItem: CartStoreItem,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pin: '',
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

  onSubmit(): void {}

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
