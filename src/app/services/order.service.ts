import { Injectable } from '@angular/core';
import { Order } from '../models/order.model'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerURLs } from  '../../assets/config';

@Injectable()
export class OrderService {
   ascending : boolean;
  constructor(private http: Http) {
    this.ascending = true;
  }

  getOrderList() : Observable<any> {
    return this.http.get(ServerURLs.orderUrl).pipe(map(r => r.json()));
  }

  getOrderById(orderId:any) : any {
    return this.http.get(ServerURLs.orderQueryUrl+"?Id="+orderId+"&format=json").pipe(map(r => r.json()));
  }

  getSortedList(param: any) : Observable<any>{
    if (this.ascending){
      this.ascending = !this.ascending;
      return this.http.get(ServerURLs.orderQueryUrl+"?orderBy=" +param).pipe(map(r => r.json()));
    }
    else{
      this.ascending = !this.ascending;
      return this.http.get(ServerURLs.orderQueryUrl+"?orderBy=-" +param).pipe(map(r => r.json()));
    }

  }

  getSkippedList(skipValue:number){
    return this.http.get(ServerURLs.orderQueryUrl+"?skip="+skipValue+"&include=Total&format=json").pipe(map(r => r.json()));

  }

  getSearchList(searchValue: any, searchText:any) : Observable<any> {
    return this.http.get(ServerURLs.orderQueryUrl+"?" +searchValue+"Contains="+searchText).pipe(map(r => r.json()));
  }
}

