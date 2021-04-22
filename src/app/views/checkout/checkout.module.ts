import { NetBanking } from './../../common/model/net-banking';
import { UserOrder } from './../../common/model/user-order';
import { DelivaryContactInfo } from './../../common/model/delivary-contact-info';
import { DelivaryLocationInfo } from './../../common/model/delivary-location-info';
import { CheckoutComponent } from './checkout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { Product } from 'src/app/common/model/product';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule
  ],
  providers: [Product,DelivaryLocationInfo,DelivaryContactInfo,UserOrder,NetBanking]
})
export class CheckoutModule { }
