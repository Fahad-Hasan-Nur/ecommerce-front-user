import { UserTransactionService } from './../../common/service/user-transaction/user-transaction.service';
import { AdminService } from './../../common/service/admin/admin.service';
import { ImageService } from './../../common/service/image/image.service';
import { ProductService } from './../../common/service/product/product.service';
import { OrderService } from './../../common/service/user-transaction/order.service';
import { UserOrder } from './../../common/model/user-order';
import { Component, OnInit } from '@angular/core';
import { UserCartProduct } from 'src/app/common/model/user-cart-product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public data:UserOrder[];
  constructor(
    private service :OrderService,
    private productService:ProductService,
    private imageService:ImageService,
    private adminService:AdminService,
    private userTransactionService:UserTransactionService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  private getOrders(){
    this.service.getUserOrderByUserId(this.adminService.usersStorage().id).subscribe
    (
      (response) => {
        this.data = response;
        this.data.forEach(element => {
          element=this.getOrderDetail(element);
        });
        console.log(this.data)
      },
      (err) => {
        console.log(err)
      }
    )
  }
  getOrderDetail(ob:UserOrder):UserOrder{
    this.userTransactionService.getProductByOrder(ob.id).subscribe
    (
      (response) => {
        ob.userCartProduct = response;
        ob.userCartProduct.forEach(element => {
          element=this.getProduct(element);
        });
      },
      (err) => {
        console.log(err)
      }
    )
    return ob;
  }
  getProduct(ob: UserCartProduct): UserCartProduct {
    this.productService.getProductById(ob.productId).subscribe
      (
        (response) => {
          ob.product = response;
          ob.brandName = ob.product.brandName;
          ob = this.getImage(ob);
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
