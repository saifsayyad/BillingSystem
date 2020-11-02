import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Item, Bill } from '../../bill';
import { ItemService } from '../item-list.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.css']
})
export class BillItemListComponent implements OnInit, OnDestroy {
  newItem: Item[] = [];
  newBill: Bill;
  after_discount: number = 0;
  discount: number = 0;
  processing: boolean = false;
  private itemsSub: Subscription;
  displayedColumns: string[] = ['item_name', 'item_price', 'item_quantity'];
  finalCost: number = 0;

  date = new FormControl(new Date());

  constructor(public itemService: ItemService, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.newItem = this.itemService.getItem();
    this.itemsSub = this.itemService.getItemtUpdateListener().subscribe((items: Item[]) => {this.newItem = items;});
  }

  ngOnDestroy(){
    this.itemsSub.unsubscribe();
  }

  openSnackbar(message: any){
    this._snackBar.open(message.msg, 'close', {
      duration: 2000
    });
  }

  calculateDiscount(percentDiscount: number){
    this.after_discount = Math.ceil(this.finalCost - (this.finalCost * (percentDiscount/100)));

  }

  getTotalCost() {
    return this.newItem.map(t => t.item_price).reduce((acc, value) => acc + value, 0);
  }

  getFinalTotal(){
    this.finalCost = 0;
    this.newItem.forEach(element => {
      this.finalCost += element.item_price * element.item_quantity;
    });
    if(this.after_discount == 0){
      this.after_discount = this.finalCost;
    }
    return this.finalCost;
  }

  onAddBill(form: NgForm){
    if (form.invalid){
      return;
    }
    this.processing = true;
    this.itemService.finalizeBill(form.value.name, form.value.cell_number, form.value.final_bill, form.value.bill_date).subscribe(res=>{
      this.openSnackbar(res);
      this.processing = false;
    });
    form.resetForm();
    this.itemService.clearItems();
  }
}
