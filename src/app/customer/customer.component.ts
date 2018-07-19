import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService, OrderService]
})
export class CustomerComponent implements OnInit {
  customerId: any;
  actualList: Customer[];
  orderList: Order[];
  constructor(private route: ActivatedRoute, private customerService: CustomerService, private orderService: OrderService) {
    this.route.params.subscribe(params => this.customerId = params['id']);
    this.loadCustomerData();
  }

  ngOnInit() {
  }

  loadCustomerData() {
    this.actualList = new Array();
    this.orderList = new Array();
    this.customerService.getCustomerById(this.customerId).subscribe((data) => {
      this.actualList.push(data.Customer);
      data.CustomerOrders.forEach(element => {
        element.Order.OrderDate = element.Order.OrderDate.slice(6, 18);
        element.Order.RequiredDate = element.Order.RequiredDate.slice(6, 18);
        this.orderList.push(element.Order);
      });
    });
  }

}
