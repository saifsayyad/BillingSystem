import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: "app-product",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"]
})
export class ProductComponent implements OnInit, OnDestroy {
  processing: boolean = false;

  constructor(private productService: ProductService, private _snackBar: MatSnackBar){}

  ngOnInit(){

  }
  ngOnDestroy(){

  }

  openSnackbar(message: any){
    this._snackBar.open(message.msg, 'close', {
      duration: 2000
    });
  }

  onAddProduct(form: NgForm){

    if(!form.valid){
      return;
    }
    this.processing = true;
    this.productService.addProduct(form.value.product_name,
       form.value.product_id, form.value.product_quantity, form.value.selling_price, form.value.current_bought_price).subscribe(res=>{
        this.openSnackbar(res);
        form.resetForm();
        this.processing = false;
       });
  }
}
