import { StorageService } from './../../common/service/storage/storage.service';
import { AdminService } from './../../common/service/admin/admin.service';
import { ToastService } from './../../common/service/toast/toast.service';
import { RatingComponent } from './component/rating/rating.component';
import { ProductService } from './../../common/service/product/product.service';
import { Product } from './../../common/model/product';
import { BrandService } from './../../common/service/product/brand.service';
import { Brand } from './../../common/model/brand';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/common/model/category';
import { CategoryService } from 'src/app/common/service/product/category.service';
import { SubCategoryService } from 'src/app/common/service/product/sub-category.service';
import { ImageService } from 'src/app/common/service/image/image.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { success_message } from 'src/app/common/constants/messages';
import { URL } from 'src/app/common/constants/nav.constants';
import { AUTH } from 'src/app/common/constants/global-variables.constant';
import { LoginComponent } from 'src/app/common/components/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public totalProduct:number=0;
  public category: Category[] = [];
  public brand: Brand[] = [];
  public product: Product[] = [];
  public dataSource = new MatTableDataSource;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public starRating=0;
  currentRate=5;
  public token:string=null;

  constructor(private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    private imageService: ImageService,
    protected dialog: MatDialog,
    public route: ActivatedRoute,
    private toastService: ToastService,
    private adminService: AdminService,
    private storage: StorageService
    ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getBrand();
    this.getProduct();
    this.token = this.route.snapshot.params.id;
      if(this.token!=null){
        this.activateUser(this.token);
      }
  }
  private activateUser(token:string){
   this.adminService.activateUser(token).subscribe
   (
     (response) => {
      this.toastService.openSnackBar(success_message.ACCOUNT_ACTIVATE_SUCCESS, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
      console.log(response);
      window.location.replace(window.location.href.replace('/home/'+this.token, URL.HOME) );
     }, (error) => {
      window.location.replace(window.location.href.replace('/home/'+this.token, URL.HOME) );
       console.log(error);
    });
  }

  getCategory() {
    this.categoryService.getCategory().subscribe
      (
        (response) => {
          response.forEach(element => {
            element = this.getSubCategory(element);
          });
          this.category = response;
          console.log(this.category)
        },
        (error) => console.log(error),
      );
  }

  getBrand() {
    this.brandService.getBrand().subscribe
      (
        (response) => {
          this.brand = response;
          console.log(this.brand)
        },
        (error) => console.log(error),
      );
  }

  getSubCategory(category: Category): Category {
    this.subCategoryService.getSubCategoryByCategoryId(category.id).subscribe
      (
        (response) => {
          category.subCategory = response
        },
        (error) => console.log(error),
      );
    return category;
  }

  getProduct() {
    this.productService.getProducts().subscribe
      (
        (response) => {
          this.product = response;
          this.product.forEach(element => {
            element = this.getImage(element);
            element=this.getVariation(element);
            this.totalProduct++;
          });
          console.log(this.product)
        },
        (error) => console.log(error),
      );
  }

  getImage(product: Product): Product {
    this.imageService.getImageById(product.imageId).subscribe
      (
        (response) => {
          this.retrieveResonse = response;
          this.base64Data = this.retrieveResonse.picByte;
          product.image = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (error) => console.log(error),
      );
    return product;
  }

  getVariation(product: Product): Product {
    this.productService.getVariations(product.id).subscribe
      (
        (response) => {
          product.variation=response
        },
        (error) => console.log(error),
      );
    return product;
  }

  public getProductBySubCategory(id:string){
    this.productService.getProductBySubCategoryId(id).subscribe
      (
        (response) => {
          this.product = response;
          this.totalProduct=0;
          this.product.forEach(element => {
            element = this.getImage(element);
            element=this.getVariation(element);
            this.totalProduct++;
          });
          console.log(this.product)
        },
        (error) => console.log(error),
      );
  }

  public getByBrand(id:string){
    this.productService.getProductByBrandId(id).subscribe
      (
        (response) => {
          this.product = response;
          this.product.forEach(element => {
            element = this.getImage(element);
            element=this.getVariation(element);
          });
          console.log(this.product)
        },
        (error) => console.log(error),
      );
  }
rating(id:string){
 if(this.storage.read(AUTH.TOKEN)==null){
  this.toastService.openSnackBar(success_message.ERROR_RATING, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
  this.dialog.open(LoginComponent);
}else{
  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: id
    };
    this.dialog.open(RatingComponent, dialogConfig);
}
}

}
