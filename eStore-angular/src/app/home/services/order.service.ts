// Third party imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Local imports
import { DeliveryAddress } from '../interfaces/cart.interface';
import {
  Order,
  OrderItem,
  PastOrder,
  PastOrderProduct,
} from '../interfaces/order.interface';
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

  getOrders(userEmail: string): Observable<PastOrder[]> {
    const url: string = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`;

    return this.http.get<PastOrder[]>(url, {
      headers: { authorization: this.userService.token },
    });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    const url: string = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`;

    return this.http.get<PastOrderProduct[]>(url, {
      headers: { authorization: this.userService.token },
    });
  }
}
