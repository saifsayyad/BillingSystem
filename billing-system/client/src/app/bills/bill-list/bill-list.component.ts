import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bill, Item } from 'src/app/bill';
import { CreateBillService } from 'src/app/create-bill.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit, OnDestroy {
  allbill: any = [];
  allbillsBackup: any = [];
  dicsountPercent: number = 0;
  beforeDiscount: number = 0;
  displayedColumns: string[] = ['item_name', 'item_price', 'item_quantity'];
  constructor (public createBillService: CreateBillService, private _snackBar: MatSnackBar){}

  fetchFreshBill(){
    this.createBillService.getBills().subscribe(res => {
      this.allbill = res;
      this.allbillsBackup = res;
    });
  }

  ngOnInit(){
    this.fetchFreshBill();
  }

  ngOnDestroy(){

  }

  onFilterBill(form: NgForm){
    this.allbill = this.allbillsBackup;
    if(form.value.name !== "" && form.value.name !== null){
      this.allbill = this.allbill.filter(bill => bill.name.toLowerCase().includes(form.value.name.toLowerCase()));
    }
    if(form.value.cell_number !=="" && form.value.cell_number !== null){
      this.allbill = this.allbill.filter(bill => bill.cell_number.includes(form.value.cell_number));
    }

    if(form.value.start_date !== null && form.value.end_date !== null){
      this.allbill = this.allbill.filter(bill => (((new Date(bill.bill_date)) >= form.value.start_date) && ((new Date(bill.bill_date)) <= form.value.end_date)));
    }

    else if((form.value.name === "" || form.value.name === null) && (form.value.cell_number ==="" || form.value.cell_number === null))
    {
      this.allbill = this.allbillsBackup;
    }

  }

  onResetForm(form: NgForm){
    this.allbill = this.allbillsBackup;
    form.resetForm();
  }

  openSnackbar(message: string){
    this._snackBar.open(message, 'close', {
      duration: 3000,
    });
  }

  ontThisTabactive(fetchData: boolean){
    console.log("called");
    if(fetchData){
      this.fetchFreshBill();
    }
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

  getActualCost(bill: Bill){
    return this.totaler(bill.bill_items);
  }

  getDiscountGiven(bill: Bill){
    return Math.ceil((this.totaler(bill.bill_items) - bill.final_bill));
  }

  deleteBill(id: string){
    this.createBillService.deleteBill(id).subscribe(res => {
      this.openSnackbar('Bill Deleted!');
      console.log(this.allbill);
      this.allbill = this.allbill.filter(bill => bill._id !== id);
      console.log(this.allbill);
    })
  }
}
