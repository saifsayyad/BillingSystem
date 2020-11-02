import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product, BoughtHistory, Bill, SellingHistory, Item } from '../bill';
import { CreateBillService } from '../create-bill.service';

@Injectable({providedIn: 'root'})
export class ProductService{
  private product: Product[] = [];
  private productUpdated = new Subject<Product[]>();
  public someoutput: any;

  constructor(private createBillService: CreateBillService) {
    this.createBillService.getProductData().subscribe((product: Product[])=> {
      this.product = product;
      // console.log(this.product);
    });
    this.productUpdated.next([...this.product]);
  }

  getProduct(){
    return this.createBillService.getProductData();
  }

  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

  addProduct(product_name: string, product_id: number, product_quantity: number, selling_price: number, current_bought_price: number){
    const boughtHistory: BoughtHistory = {bought_quantity: product_quantity, bought_price: current_bought_price, bought_date: new Date()};
    const product: Product = {product_name: product_name, product_id: product_id, product_quantity:product_quantity,
       selling_price:selling_price, current_bought_price:current_bought_price, bought_history:[boughtHistory], selling_history:[]};

    var product_already_added: boolean = false;
    this.product.forEach(element => {
      if (product.product_name === element.product_name){
        product_already_added = true;
      }
    });
    if (!product_already_added){
      this.product.push(product);
    }
    this.productUpdated.next([...this.product]);
    return this.createBillService.addProduct(product);
  }

  totaler(items: Item[]){
    var total: number = 0;
    items.forEach(element => {
      total += element.item_price * element.item_quantity;
    });
    return total;
  }

  calculateDiscount(bill: Bill){
    var actual_total: number = this.totaler(bill.bill_items);
    return Math.ceil(((actual_total - bill.final_bill)*100)/actual_total);
  }

  updateProductForBill(newBill: Bill){
    var discount: number = this.calculateDiscount(newBill);
    newBill.bill_items.forEach(billItem => {
      this.product.forEach(productItem => {
        if(billItem.item_name === productItem.product_name){
          productItem.product_quantity -= billItem.item_quantity;
          var sellingHistory: SellingHistory = {
            sold_date: newBill.bill_date,
            sold_price: billItem.item_price,
            sold_quantity: billItem.item_quantity,
            profit: billItem.item_price - (billItem.item_price * (discount/100))
          };
          productItem.selling_history.push(sellingHistory);
          this.createBillService.updateProduct(productItem).subscribe(res => {console.log(res);});
        }
      });
    });
    this.productUpdated.next([...this.product]);
  }
}
