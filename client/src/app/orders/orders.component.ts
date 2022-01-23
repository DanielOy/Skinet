import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders?: Order[];

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(orders);
    }, error => {
      console.log(error);
    });
  }
}
