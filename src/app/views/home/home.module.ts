import { AngularMaterialModule } from './../../angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Category } from './../../common/model/category';
import { CartModule } from './../cart/cart.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './component/rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rating } from 'src/app/common/model/rating';



@NgModule({
  declarations: [HomeComponent, RatingComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers:[Category,Rating],
  entryComponents:[RatingComponent]
})
export class HomeModule { 
}

