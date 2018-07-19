import { Component, OnInit } from '@angular/core';

import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [CustomerService, OrderService]
})
export class OrderComponent implements OnInit {
  orderId: any;
  orderList: Order[];
  constructor(private route: ActivatedRoute, private orderService: OrderService, private customerService: CustomerService) {
    this.route.params.subscribe(params => this.orderId = params['id']);
    this.loadOrderData();
  }

  ngOnInit() {
  }

  loadOrderData(){
    this.orderList = new Array();
    this.orderService.getOrderById(this.orderId).subscribe((data) => {
      console.log(data.Results);
      data.Results.forEach((element) => {
        element.OrderDate = element.OrderDate.slice(6, 18);
        element.RequiredDate = element.RequiredDate.slice(6, 18);
        this.orderList.push(element);
      });

    });
  }
}
