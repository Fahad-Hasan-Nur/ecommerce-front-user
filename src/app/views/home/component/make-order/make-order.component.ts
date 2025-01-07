import { ToastService } from 'src/app/common/service/toast/toast.service';
import { AdminService } from 'src/app/common/service/admin/admin.service';
import { Variation } from './../../../../common/model/variation';
import { ProductService } from './../../../../common/service/product/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/common/model/product';
import { UserCartProduct } from 'src/app/common/model/user-cart-product';
import { UserTransactionService } from 'src/app/common/service/user-transaction/user-transaction.service';
import { success_message } from 'src/app/common/constants/messages';
import { URL } from 'src/app/common/constants/nav.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {

  public selectedPrice:number=0;
  public avaibaleQuantity:number=0;
  public selectedQuantity:number=0;
  private checkout:boolean=false;
  private check: boolean=false;
  
  constructor(private dialogRef: MatDialogRef<MakeOrderComponent>,
    private router: Router,
    public product:Product,
    public userCartProduct:UserCartProduct,
    public adminService:AdminService,
    private toastService:ToastService,
    private service:UserTransactionService,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.product = data.id;
  }
  ngOnInit() {
    this.checkQuantity();
  }

  checkQuantity(){
    this.product.variation.forEach(element => {
      if(element.quantity==0){
        this.check=true;
      }
      if(this.check==true){
        this.toastService.openSnackBar(success_message.OUT_OF_STOCK, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      }
    });
  }
  close(){
    this.dialogRef.close();
  }
  purchase(){
    this.checkout=true;
    this.addToCart();
  }
  addToCart(){
    if(this.selectedQuantity>this.avaibaleQuantity){
      this.toastService.openSnackBar("Sorry we have only "+this.avaibaleQuantity +" items avalable.", this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
    }else{
      this.userCartProduct.productId=this.product.id;
      this.userCartProduct.userId=this.adminService.usersStorage().id;
      this.userCartProduct.quantity=this.selectedQuantity;
      this.userCartProduct.totalCost=this.selectedPrice*this.selectedQuantity;
      this.userCartProduct.status="CART";
      this.userCartProduct.createdBy=this.adminService.usersStorage().id;
      this.service.addUserCartProduct(this.userCartProduct).subscribe
      (
        (response) => {
          this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          if(this.checkout){
            this.dialogRef.close();
            this.router.navigateByUrl(URL.CHECKOUT);
          }else{
            this.dialogRef.close();
            this.router.navigateByUrl(URL.CART);
          }
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        });
    }
   
  }
  selectVariation(ob:Variation){
    this.userCartProduct.variationId=ob.id;
    this.selectedPrice=Math.round(ob.price-ob.price*ob.discount/100);
    this.avaibaleQuantity=ob.quantity;
  }
  selectColor(color:string){
    this.userCartProduct.color=color;
  }


}
