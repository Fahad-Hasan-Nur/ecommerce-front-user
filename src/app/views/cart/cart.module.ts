import { Product } from 'src/app/common/model/product';
import { CartRoutingModule } from './cart-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  providers: [Product]
})
export class CartModule { }
