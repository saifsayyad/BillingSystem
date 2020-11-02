import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bill, Item } from '../bill';
import { CreateBillService } from '../create-bill.service';
import { ProductService } from './product.service';

@Injectable({providedIn: 'root'})
export class ItemService{
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();
  private bill: Bill;
  public someoutput: any;

  constructor(private createBillService: CreateBillService, private productService: ProductService) {
  }

  getItem(){
    return [...this.items];
  }

  getItemtUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  addItem(item_name: string,item_price: number,item_quantity: number){
    const item: Item = {item_name:item_name, item_price: item_price, item_quantity: item_quantity};
    // console.log(item);
    var product_already_added: boolean = false;
    this.items.forEach(element => {
      if (item.item_name === element.item_name){
        element.item_quantity += item.item_quantity;
        product_already_added = true;
      }
    });
    if (!product_already_added){
      this.items.push(item);
    }
    this.itemsUpdated.next([...this.items]);
  }

  finalizeBill(name: string, cell_number: number, final_bill:number, bill_date: Date){
    this.bill = {name:name, cell_number:cell_number, bill_date: bill_date, final_bill:final_bill, bill_items: [...this.items]};
    console.log("herereer5");
    this.productService.updateProductForBill(this.bill);
    console.log("hereree65r");
    return this.createBillService.addBill(this.bill);
  }

  productData(){
    return this.createBillService.getProductData();
  }

  clearItems(){
    this.items = [];
    this.itemsUpdated.next([]);
  }
}
