import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service'
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [CustomerService, OrderService]
})
export class OrderListComponent implements OnInit {

  actualList: Customer[];
  orderList: Order[];
  sortName: string;
  searchText: string;
  searchValue: string;
  initialIndex:number;
  finalIndex:number;
  totalOrders:number;
  constructor(private orderService: OrderService) {
    this.getOrderList();
    this.sortName = "";
    this.searchValue = "";
    this.initialIndex = 1;
    this.finalIndex = 100;
    this.totalOrders = 0;
  }

  ngOnInit() {
  }

  getOrderList() {
    this.orderList = new Array();
    this.orderService.getOrderList().subscribe((data) => {
      console.log(data);
      this.totalOrders = data.Total;
      data.Results.forEach((element) => {
        element.OrderDate = element.OrderDate.slice(6, 18);
        element.RequiredDate = element.RequiredDate.slice(6, 18);
        this.orderList.push(element);
      });

    });
  }


  sort(param: any) {
    this.orderList = new Array();
    this.orderService.getSortedList(param).subscribe((data) => {
      data.Results.forEach((element) => {
        element.OrderDate = element.OrderDate.slice(6, 18);
        element.RequiredDate = element.RequiredDate.slice(6, 18);
        this.orderList.push(element);
      });

    });
  }

  search() {
    if (this.searchText.length > 0 && this.searchValue.length > 0) {
      this.orderList = new Array();
      this.orderService.getSearchList(this.searchValue, this.searchText).subscribe((data) => {
        data.Results.forEach((element) => {
          element.OrderDate = element.OrderDate.slice(6, 18);
          element.RequiredDate = element.RequiredDate.slice(6, 18);
          this.orderList.push(element);
        });
      });
    }
  }

  previousPage(){
    if(this.initialIndex>2){
      this.orderList = new Array();
      this.finalIndex = this.finalIndex-100;
      this.initialIndex = this.initialIndex-100;
      this.orderService.getSkippedList(this.initialIndex-1).subscribe((data) => {

        this.totalOrders = data.Total;
        data.Results.forEach((element) => {
          element.OrderDate = element.OrderDate.slice(6, 18);
          element.RequiredDate = element.RequiredDate.slice(6, 18);
          this.orderList.push(element);
        });

      });

    }
  }

  nextPage(){
    if(this.finalIndex<this.totalOrders){
      this.orderList = new Array();
      this.finalIndex = this.finalIndex+100;
      this.initialIndex = this.initialIndex+100;

      this.orderService.getSkippedList(this.initialIndex-1).subscribe((data) => {

        this.totalOrders = data.Total;
        if(this.finalIndex > this.totalOrders)
        {
          this.finalIndex = this.totalOrders
        }
        data.Results.forEach((element) => {
          element.OrderDate = element.OrderDate.slice(6, 18);
          element.RequiredDate = element.RequiredDate.slice(6, 18);
          this.orderList.push(element);
        });

      });

    }
  }

}
