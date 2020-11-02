import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Bill, Product } from './bill';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateBillService {

  constructor(private http: HttpClient) { }

  getBills(){
    return this.http.get('http://localhost:3000/api/billing');
  }

  getProductData(){
    return this.http.get<Product[]>('http://localhost:3000/api/product');
  }

  addProduct(newProduct: Product){
    var httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'application/json');
    console.log(newProduct);
    return this.http.post('http://localhost:3000/api/product', newProduct, {headers: httpHeader});
  }


  updateProduct(newProduct: Product){
    var httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type','application/json');
    return this.http.put('http://localhost:3000/api/product/'+newProduct.product_name, newProduct, {headers: httpHeader})
  }

  addBill(newBill: Bill){
    var httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/billing', newBill, {headers: httpHeader});
  }

  deleteBill(id: string) {
    return this.http.delete('http://localhost:3000/api/billing/'+id);
  }
}
