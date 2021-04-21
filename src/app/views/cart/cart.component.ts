import { Router } from '@angular/router';
import { ToastService } from 'src/app/common/service/toast/toast.service';
import { element } from 'protractor';
import { ImageService } from 'src/app/common/service/image/image.service';
import { ProductService } from 'src/app/common/service/product/product.service';
import { Product } from 'src/app/common/model/product';
import { UserCartProduct } from './../../common/model/user-cart-product';
import { AdminService } from 'src/app/common/service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { UserTransactionService } from 'src/app/common/service/user-transaction/user-transaction.service';
import { success_message } from 'src/app/common/constants/messages';
import { URL } from 'src/app/common/constants/nav.constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public data:UserCartProduct[];
  public totalCost: number=0;
  constructor(
    private service:UserTransactionService,
    private adminService:AdminService,
    private productService:ProductService,
    private imageService:ImageService,
    public product:Product,
    private toastService:ToastService,
  ) { }

  ngOnInit(): void {
    this.getCartProduct();
  }
  getCartProduct(){
    this.service.getCartProduct(this.adminService.usersStorage().id).subscribe
    (
      (response) => {
        this.data = response;
        this.data.forEach(element => {
        this.totalCost=this.totalCost+element.totalCost;
        element=this.getProduct(element);
        element=this.getVariation(element);
        });
      },
      (error) => console.log(error),
    );
  }
  getProduct(ob:UserCartProduct):UserCartProduct{
      this.productService.getProductById(ob.productId).subscribe
        (
          (response) => {
            ob.product=response;
            ob.brandName=ob.product.brandName;
            ob=this.getImage(ob);
          },
          (error) => console.log(error),
        );
        return ob;
  }
  getImage(ob: UserCartProduct): UserCartProduct {
    this.imageService.getImageById(ob.product.imageId).subscribe
      (
        (response) => {
          this.retrieveResonse = response;
          this.base64Data = this.retrieveResonse.picByte;
          ob.image = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (error) => console.log(error),
      );
    return ob;
  }

  getVariation(ob: UserCartProduct): UserCartProduct {
    this.productService.getVariationById(ob.variationId).subscribe
      (
        (response) => {
          ob.variation = response
        },
        (error) => console.log(error),
      );
    return ob;
  }
  remove(element:string){
    this.service.deleteUserCartProductById(element).subscribe
    (
      (response) => {
        console.log(response)
      },
      (error) => {console.log(error.error.text);
        this.toastService.openSnackBar(error.error.text, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
      }
    );  
    window.location.reload();  }
  coupon(){
    this.toastService.openSnackBar(success_message.COUPON_ERROR, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
  }

}
