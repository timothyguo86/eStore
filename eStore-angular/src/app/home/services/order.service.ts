// Third party imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Local imports
import { DeliveryAddress } from '../interfaces/cart.interface';
import { Order, OrderItem } from '../interfaces/order.type';
import { CartStoreItem } from '../store/cartStoreItem';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly http: HttpClient,
    private readonly cartStoreItem: CartStoreItem,
    private readonly userService: UserService,
  ) {}

  saveOrder(
    deliveryAddress: DeliveryAddress,
    userEmail: string,
  ): Observable<any> {
    const url: string = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStoreItem.cart.products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStoreItem.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };

    return this.http.post(url, order, {
      headers: {
        authorization: this.userService.token,
      },
    });
  }
}
