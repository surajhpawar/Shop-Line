import { Component } from '@angular/core';
import  { CustomerService } from './services/customer.service';
import  { OrderService } from './services/order.service'
import { Customer } from './models/customer.model';
import { Order } from './models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(){

  }
}
