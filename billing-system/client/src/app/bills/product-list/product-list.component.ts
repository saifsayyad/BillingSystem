import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/bill';
import { ProductService } from '../product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { element } from 'protractor';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {

  prodSub: Subscription;
  products: Product[] = [];
  disableStatus: any = {};
  processing: boolean = true;

  constructor(private productService: ProductService, private _snackBar: MatSnackBar){}

  ngOnInit(){
    this.productService.getProduct().subscribe((products: Product[])=>{this.products = products});
    this.prodSub = this.productService.getProductUpdateListener().subscribe((product: Product[]) => {
      this.products = product;
      this.products.forEach(element => {
        var prod_name = element.product_name;
        this.disableStatus[prod_name] = true;
      })
    });
  }
  ngOnDestroy(){
    this.prodSub.unsubscribe();
  }

  openSnackbar(message: any){
    this._snackBar.open(message.msg, 'close', {
      duration: 2000
    });
  }

  onUpdateProduct(form: NgForm){

    if(!form.valid){
      return;
    }
    console.log(form);
    this.processing = !this.processing;
    // this.productService.updateProduct(form.value.product_name,
    //    form.value.product_id, form.value.product_quantity, form.value.selling_price, form.value.current_bought_price).subscribe(res=>{
    //     this.openSnackbar(res);
    //     form.resetForm();
    //     this.processing = false;
    //    });
  }

}
