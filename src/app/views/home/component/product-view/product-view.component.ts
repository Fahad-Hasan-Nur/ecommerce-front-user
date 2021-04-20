import { StorageService } from './../../../../common/service/storage/storage.service';
import { HomeViewComponent } from './../home-view/home-view.component';
import { Product } from './../../../../common/model/product';
import { StateService } from './../../../../common/service/state/state.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/common/service/product/product.service';
import { ImageService } from 'src/app/common/service/image/image.service';
import { AUTH } from 'src/app/common/constants/global-variables.constant';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{
  
  constructor(private state:StateService,
    public product:Product,
    private storage:StorageService
    ) {}

  ngOnInit(): void {
    this.product=this.storage.read(AUTH.PRODUCT);
    console.log(this.product)
  }

}
