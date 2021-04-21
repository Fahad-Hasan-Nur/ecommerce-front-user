import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/model/product';
import { UserCartProduct } from 'src/app/common/model/user-cart-product';
import { AdminService } from 'src/app/common/service/admin/admin.service';
import { ImageService } from 'src/app/common/service/image/image.service';
import { ProductService } from 'src/app/common/service/product/product.service';
import { ToastService } from 'src/app/common/service/toast/toast.service';
import { UserTransactionService } from 'src/app/common/service/user-transaction/user-transaction.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

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

}
