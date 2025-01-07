import { Router } from '@angular/router';
import { ImageService } from './../../../../common/service/image/image.service';
import { AdminService } from './../../../../common/service/admin/admin.service';
import { MakeOrderComponent } from './../make-order/make-order.component';
import { ToastService } from 'src/app/common/service/toast/toast.service';
import { StorageService } from './../../../../common/service/storage/storage.service';
import { HomeViewComponent } from './../home-view/home-view.component';
import { Product } from './../../../../common/model/product';
import { StateService } from './../../../../common/service/state/state.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/common/service/product/product.service';
import { AUTH } from 'src/app/common/constants/global-variables.constant';
import { success_message } from 'src/app/common/constants/messages';
import { LoginComponent } from 'src/app/common/components/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';
import { URL } from 'src/app/common/constants/nav.constants';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{
  
  public products:Product[]=[];
  public selectedPrice:number;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  constructor(private state:StateService,
    public product:Product,
    private storage:StorageService,
    private toastService:ToastService,
    protected dialog: MatDialog,
    private productService:ProductService,
    private adminService:AdminService,
    private imageService:ImageService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.product=this.storage.read(AUTH.PRODUCT);
    console.log(this.product);
    this.getRecommendedProduct();
  }
  
  select(data:number){
    this.selectedPrice=Math.round(data);
  }

  rating(id: string) {
    if (this.storage.read(AUTH.TOKEN) == null) {
      this.toastService.openSnackBar(success_message.ERROR_RATING, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      this.dialog.open(LoginComponent);
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: id
      };
      this.dialog.open(RatingComponent, dialogConfig);
    }
  }

  makeOrder() {
    if (this.storage.read(AUTH.TOKEN) == null) {
      this.toastService.openSnackBar(success_message.ERROR_RATING, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      this.dialog.open(LoginComponent);
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: this.product
      };
      this.dialog.open(MakeOrderComponent, dialogConfig);
    }
  }
  getRecommendedProduct(){
    this.productService.getItemBasedRecommendedProducts(this.product.id).subscribe
    (
      (response) => {
        this.products = response;
        console.log(response)
        this.products.forEach(element => {
          element = this.getImage(element);
          element = this.getVariation(element);
        });
        console.log(this.products)
      },
      (error) => console.log(error),
    );
  }
  getImage(product: Product): Product {
    this.imageService.getImageById(product.imageId).subscribe
      (
        (response) => {
          this.retrieveResonse = response;
          this.base64Data = this.retrieveResonse.picByte;
          product.image = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (error) => console.log(error),
      );
    return product;
  }

  getVariation(product: Product): Product {
    this.productService.getVariations(product.id).subscribe
      (
        (response) => {
          product.variation = response
        },
        (error) => console.log(error),
      );
    return product;
  }
  viewProduct(ob?){
    this.storage.save(AUTH.PRODUCT,ob);
    window.location.reload();
  }

}
