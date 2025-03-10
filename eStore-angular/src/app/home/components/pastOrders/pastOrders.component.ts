// First-party imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
// Local imports
import { PastOrder, PastOrderProduct } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pastOrders',
  imports: [CurrencyPipe],
  templateUrl: './pastOrders.component.html',
  styleUrl: './pastOrders.component.scss',
})
export class PastOrdersComponent implements OnInit, OnDestroy {
  pastOrderProducts: PastOrderProduct[] = [];
  pastOrder!: PastOrder;
  pastOrders: PastOrder[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.orderService
        .getOrders(this.userService.loggedInUser.email)
        .subscribe((pastOrders) => {
          this.pastOrders = pastOrders;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  selectOrder(event: any) {
    if (Number.parseInt(event.target.value) > 0) {
      this.pastOrder = this.pastOrders.filter(
        (order) => order.orderId === Number.parseInt(event.target.value),
      )[0];

      this.getOrderProducts(this.pastOrder.orderId);
    } else {
      this.pastOrder = <any>undefined;
      this.pastOrderProducts = [];
    }
  }

  getOrderProducts(orderId: number) {
    this.subscriptions.add(
      this.orderService
        .getOrderProducts(orderId)
        .subscribe((products) => (this.pastOrderProducts = products)),
    );
  }
}
