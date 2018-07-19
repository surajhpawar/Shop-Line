import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OrderByPipe} from '../assets/order.pipe';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: 'customer-list',
    component: CustomerListComponent,
  },
  {
    path: 'order-list',
    component: OrderListComponent,
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
  },
  {
    path: 'order/:id',
    component: OrderComponent,
  },
  {
    path:'',
    component: HomeComponent,
  }
];


@NgModule({
  declarations: [
    OrderByPipe,
    AppComponent,
    CustomerListComponent,
    OrderListComponent,
    CustomerComponent,
    OrderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
