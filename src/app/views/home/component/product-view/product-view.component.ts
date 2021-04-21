import { MakeOrderComponent } from './../make-order/make-order.component';
import { ToastService } from 'src/app/common/service/toast/toast.service';
import { StorageService } from './../../../../common/service/storage/storage.service';
import { HomeViewComponent } from './../home-view/home-view.component';
import { Product } from './../../../../common/model/product';
import { StateService } from './../../../../common/service/state/state.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/common/service/product/product.service';
import { ImageService } from 'src/app/common/service/image/image.service';
import { AUTH } from 'src/app/common/constants/global-variables.constant';
import { success_message } from 'src/app/common/constants/messages';
import { LoginComponent } from 'src/app/common/components/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{
  
  public selectedPrice:number;
  constructor(private state:StateService,
    public product:Product,
    private storage:StorageService,
    private toastService:ToastService,
    protected dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.product=this.storage.read(AUTH.PRODUCT);
    console.log(this.product)
  }
  select(data:number){
    this.selectedPrice=data;
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

}
