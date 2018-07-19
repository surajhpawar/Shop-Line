import { Component, OnInit } from '@angular/core';
import  { CustomerService } from '../services/customer.service';
import  { OrderService } from '../services/order.service';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService, OrderService]
})
export class CustomerListComponent implements OnInit {
  searchValue: string;
  actualList: Customer[];
  orderList: Order[];
  searchText: string;
  initialIndex:number;
  finalIndex:number;
  totalCustomers:number;
  constructor( private customerService: CustomerService) {
    this.getCustomerList();
    this.searchValue="";
    this.initialIndex= 1;
    this.finalIndex = 0;
    this.totalCustomers = 0;
   }

  ngOnInit() {
  }


  getCustomerList() {
    this.customerService.getCustomerList().subscribe((data) => {
      this.totalCustomers = data.Total;
      if(data.Total>99){
        this.finalIndex = 100;
      }
      else
        this.finalIndex = data.Total;
      this.actualList = data.Results;
      this.searchValue = ""
    });
  }

  sort (param: any){

    this.customerService.getSortedList(param).subscribe((data) => {
      this.actualList = data.Results;

    });
  }

  search(){
    if(this.searchText.length == 0 && this.searchValue.length == 0)
      return;

      this.actualList = new Array();
    this.customerService.getSearchList(this.searchValue, this.searchText).subscribe((data) => {
      this.actualList = data.Results;
    });
  }

  previousPage(){
    if(this.initialIndex>2){
      this.orderList = new Array();
      this.finalIndex = this.finalIndex-100;
      this.initialIndex = this.initialIndex-100;
      this.customerService.getSkippedList(this.initialIndex-1).subscribe((data) => {

        this.totalCustomers = data.Total;
        data.Results.forEach((element) => {
          element.OrderDate = element.OrderDate.slice(6, 18);
          element.RequiredDate = element.RequiredDate.slice(6, 18);
          this.orderList.push(element);
        });

      });

    }
  }

  nextPage(){
    if(this.finalIndex<this.totalCustomers){
      this.orderList = new Array();
      this.finalIndex = this.finalIndex+100;
      this.initialIndex = this.initialIndex+100;

      this.customerService.getSkippedList(this.initialIndex-1).subscribe((data) => {

        this.totalCustomers = data.Total;
        if(this.finalIndex > this.totalCustomers)
        {
          this.finalIndex = this.totalCustomers
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
