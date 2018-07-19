import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerURLs } from  '../../assets/config';

@Injectable()
export class CustomerService {

  ascending: boolean;
  constructor(private http: Http) {
    this.ascending =true;
  }

  getCustomerById(customerId:any) : any {
    return this.http.get(ServerURLs.customerIdUrl+customerId+"?format=json").pipe(map(r => r.json()));
  }

  getCustomerList() : Observable<any> {
    return this.http.get(ServerURLs.customerUrl).pipe(map(r => r.json()));
  }

  getSkippedList(skipValue:number){
    return this.http.get(ServerURLs.customerQueryUrl+"?skip="+skipValue+"&include=Total&format=json").pipe(map(r => r.json()));

  }

  getSortedList(param: any) : Observable<any>{
    if (this.ascending){
      this.ascending = !this.ascending;
      return this.http.get(ServerURLs.customerQueryUrl+"?orderBy=" +param).pipe(map(r => r.json()));
    }
    else{
      this.ascending = !this.ascending;
      return this.http.get(ServerURLs.customerQueryUrl+"?orderBy=-" +param).pipe(map(r => r.json()));
    }

  }
  getSearchList(searchValue: any, searchText:any) : Observable<any> {
    return this.http.get(ServerURLs.customerQueryUrl+"?" +searchValue+"Contains="+searchText).pipe(map(r => r.json()));
  }

}
