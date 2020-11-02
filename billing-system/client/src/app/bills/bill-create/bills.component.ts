import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bill, Item, Product } from '../../bill';
import { NgForm, FormControl } from '@angular/forms';
import { ItemService } from '../item-list.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit, OnDestroy {
  bills: Bill[];
  bill: Bill;

  name: string;
  cell_number: string;
  bill_date: string;
  entry_created_date?: string;
  bill_items: Item[];

  prodOptions: Product[] = [];
  options: string[] = [];
  current_option: string = '';
  filteredOptions: Product[] = [];
  prodSub: Subscription;

  item_name: string;
  item_price: number;
  item_quantity: number;

  prod_price: number= 0;

  constructor(private itemService: ItemService) {
   }

   ngOnInit(){
    this.prodSub = this.itemService.productData().subscribe((product: Product[])=> this.prodOptions = product);
   }

   ngOnDestroy(){
    this.prodSub.unsubscribe();
   }

  onAddPost(form: NgForm) {
    if (form.invalid){
      return;
    }
    this.itemService.addItem(form.value.item_name, form.value.item_price, form.value.item_quantity);
    form.resetForm();
  }

  doFilter() {
    this.filteredOptions = this.filter();
    this.prod_price = this.filteredOptions[0].selling_price;
  }

  private filter(): Product[] {
    return this.prodOptions.filter(option => option.product_name.toLowerCase().includes(this.current_option));
  }

}
