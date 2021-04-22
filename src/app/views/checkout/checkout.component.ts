import { OrderService } from './../../common/service/user-transaction/order.service';
import { NetBanking } from './../../common/model/net-banking';
import { UserOrder } from './../../common/model/user-order';
import { DelivaryLocationInfo } from './../../common/model/delivary-location-info';
import { DelivaryContactInfo } from './../../common/model/delivary-contact-info';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/model/product';
import { UserCartProduct } from 'src/app/common/model/user-cart-product';
import { AdminService } from 'src/app/common/service/admin/admin.service';
import { ImageService } from 'src/app/common/service/image/image.service';
import { ProductService } from 'src/app/common/service/product/product.service';
import { ToastService } from 'src/app/common/service/toast/toast.service';
import { UserTransactionService } from 'src/app/common/service/user-transaction/user-transaction.service';
import { success_message } from 'src/app/common/constants/messages';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public data: UserCartProduct[];
  public totalCost: number = 0;
  public paymentMethod: string = 'Cash On Delivary';
  public edit: boolean = false;
  public complete: boolean = false;
  public loading: boolean = false;

  constructor(
    private service: UserTransactionService,
    private adminService: AdminService,
    private productService: ProductService,
    private imageService: ImageService,
    public product: Product,
    private toastService: ToastService,
    public cInfo: DelivaryContactInfo,
    public lInfo: DelivaryLocationInfo,
    public userOrder: UserOrder,
    public nBank: NetBanking,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getCartProduct();
    this.userOrder.paymentMethod = this.paymentMethod;
    this.userOrder.paymentInfo = this.paymentMethod;
  }

  getCartProduct() {
    this.service.getCartProduct(this.adminService.usersStorage().id).subscribe
      (
        (response) => {
          this.data = response;
          this.data.forEach(element => {
            this.totalCost = this.totalCost + element.totalCost;
            element = this.getProduct(element);
          });
        },
        (error) => console.log(error),
      );
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

  submit() {
    this.loading = true;
    this.userOrder.createdBy = this.adminService.usersStorage().id;
    this.userOrder.userId = this.adminService.usersStorage().id;
    this.userOrder.totalCost = this.totalCost;
    this.userOrder.status = "PENDING";
    this.saveDelivaryContactInfo();
  }

  netBankDetail() {
    this.edit = true;
    this.paymentMethod = this.nBank.name;
    this.userOrder.paymentMethod = this.nBank.name;
    this.userOrder.paymentInfo = 'User Account Nong: ' + this.nBank.accountNong + '. Transaction ID: ' + this.nBank.transactionId;
  }

  editData() {
    this.edit = false;
  }

  saveDelivaryContactInfo() {
    this.cInfo.createdBy = this.adminService.usersStorage().id;
    this.orderService.addDelivaryContactInfo(this.cInfo).subscribe
      (
        (response) => {
          this.cInfo = response;
          this.userOrder.delivaryContactInfoId = this.cInfo.id;
          this.saveDelivaryLocationInfo();
        },
        (err) => {
          this.loading = false;
          this.toastService.openSnackBar(success_message.ORDER_ERROR, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          console.log(err)
        }
      )
  }

  saveDelivaryLocationInfo() {
    this.lInfo.createdBy = this.adminService.usersStorage().id;
    this.orderService.addDelivaryLocationInfo(this.lInfo).subscribe
      (
        (response) => {
          this.lInfo = response;
          this.userOrder.delivaryLocationInfoId = this.lInfo.id;
          this.makeOrder();
        },
        (err) => {
          this.loading = false;
          this.toastService.openSnackBar(success_message.ORDER_ERROR, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          console.log(err)
        }
      )
  }

  makeOrder() {
    this.orderService.addUserOrder(this.userOrder).subscribe
      (
        (response) => {
          this.userOrder=response
          this.changeOderStatus(this.userOrder.id);
          console.log(response)
        },
        (err) => {
          this.toastService.openSnackBar(success_message.ORDER_ERROR, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          console.log(err)
          this.loading = false;
        }
      )
  }

  changeOderStatus(id:string) {
    this.data.forEach(ob => {
      ob.orderId=id;
      console.log(ob)
      this.service.orderUserProduct(ob).subscribe
        (
          (response) => {
            this.loading = false;
          },
          (err) => {
            this.toastService.openSnackBar(success_message.ORDER_ERROR, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
            console.log(err)
            this.complete = false;
            this.loading = false;
          }
        )
    });
      this.toastService.openSnackBar(success_message.ORDER_SUCCES, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
  }
}
