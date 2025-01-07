import { element } from 'protractor';
import { AUTH } from './../../../../common/constants/global-variables.constant';

import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/common/model/category';
import { CategoryService } from 'src/app/common/service/product/category.service';
import { SubCategoryService } from 'src/app/common/service/product/sub-category.service';
import { ImageService } from 'src/app/common/service/image/image.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { success_message } from 'src/app/common/constants/messages';
import { URL } from 'src/app/common/constants/nav.constants';
import { LoginComponent } from 'src/app/common/components/login/login.component';
import { Brand } from 'src/app/common/model/brand';
import { Product } from 'src/app/common/model/product';
import { AdminService } from 'src/app/common/service/admin/admin.service';
import { BrandService } from 'src/app/common/service/product/brand.service';
import { ProductService } from 'src/app/common/service/product/product.service';
import { StorageService } from 'src/app/common/service/storage/storage.service';
import { ToastService } from 'src/app/common/service/toast/toast.service';
import { RatingComponent } from '../rating/rating.component';
import { MakeOrderComponent } from '../make-order/make-order.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit{

  public recommended:Product[]=[];
  public totalProduct: number = 0;
  public category: Category[] = [];
  public brand: Brand[] = [];
  public product: Product[] = [];
  public productContainer: Product[] = [];
  public productFilter: Product[] = [];
  public dataSource = new MatTableDataSource;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public starRating = 0;
  public token: string = null;
  public minPrice: number;
  public maxPrice: number;
  public name:string;
  public totalPage:number;
  public currentPage: number=1;
 

  constructor(private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    private imageService: ImageService,
    protected dialog: MatDialog,
    public route: ActivatedRoute,
    private toastService: ToastService,
    private adminService: AdminService,
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.getCategory();
    this.getBrand();
    this.getProduct();
    this.token = this.route.snapshot.params.id;
    if (this.token != null) {
      this.activateUser(this.token);
    }
    this.getRecommendedProduct();
  }

  private activateUser(token: string) {
    this.adminService.activateUser(token).subscribe
      (
        (response) => {
          this.toastService.openSnackBar(success_message.ACCOUNT_ACTIVATE_SUCCESS, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          window.location.replace(window.location.href.replace('/home/' + this.token, URL.HOME));
        }, (error) => {
          window.location.replace(window.location.href.replace('/home/' + this.token, URL.HOME));
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
        },
        (error) => console.log(error),
      );
  }

  getBrand() {
    this.brandService.getBrand().subscribe
      (
        (response) => {
          this.brand = response;
          this.brand.forEach(element => {
            element=this.getBrandImage(element);
          });
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
          this.productContainer = response;
          this.productContainer.forEach(element => {
            element = this.getImage(element);
            element = this.getVariation(element);
            this.totalProduct++;
          });
           this.totalPage=Math.floor(this.totalProduct/5)+1;
          this.getPage(0);
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
  getBrandImage(ob: Brand): Product {
    this.imageService.getImageById(ob.imageId).subscribe
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

  getVariation(product: Product): Product {
    this.productService.getVariations(product.id).subscribe
      (
        (response) => {
          product.variation = response
        },
        (error) => console.log(error),
      );
    return product;
  }

  public getProductBySubCategory(id: string) {
    this.productService.getProductBySubCategoryId(id).subscribe
      (
        (response) => {
          this.productContainer = response;
          this.totalProduct = 0;
          this.productContainer.forEach(element => {
            element = this.getImage(element);
            element = this.getVariation(element);
            this.totalProduct++;

          });
          this.totalPage=Math.floor(this.totalProduct/5)+1;
          this.getPage(0);
        },
        (error) => console.log(error),
      );
  }

  public getByBrand(id: string) {
    this.productService.getProductByBrandId(id).subscribe
      (
        (response) => {
          this.totalProduct=0;
          this.productContainer = response;
          this.productContainer.forEach(element => {
            element = this.getImage(element);
            element = this.getVariation(element);
            this.totalProduct++;
          });
          this.totalPage=Math.floor(this.totalProduct/5)+1;
          this.getPage(0);
        },
        (error) => console.log(error),
      );
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
  filterByPrice() {
    this.totalProduct = 0;
    this.productFilter = [];
    let count = 0;
    this.productContainer.forEach(element => {
      let c = 0;
      element.variation.forEach(ob => {
        if (ob.price >= this.minPrice && ob.price <= this.maxPrice && c == 0) {
          this.productFilter[count] = element;
          count++;
          c = 1;
          this.totalProduct++;
        }
      });
    });
    this.totalPage=Math.floor(this.totalProduct/5)+1;
    this.productContainer = this.productFilter;
    this.getPage(0);
  }
  public applyFilter(filterValue: any) {
    this.name = filterValue.value.trim().toLowerCase();
    if(this.name!=''){
      this.flterByName();
    }
}
  flterByName(){
    this.productService.getProductByName(this.name).subscribe
      (
        (response) => {
          this.productContainer = response;
          this.totalProduct = 0;
          this.productContainer.forEach(element => {
            element = this.getImage(element);
            element = this.getVariation(element);
            this.totalProduct++;
          });
          this.totalPage=Math.floor(this.totalProduct/5)+1;
          this.getPage(0);
        },
        (error) => console.log(error),
      );
  }
  getPage(data:any){
    this.currentPage=Math.round(data/5)+1;
    this.product=[];
    for (let i = 0; i < 5; i++) {
      if(this.productContainer[data+i]==null){
        break;
      }
      this.product[i]=this.productContainer[data+i]; 
    }
  }
  viewProduct(data:Product){
    this.storage.save(AUTH.PRODUCT,data);
    window.location.replace(window.location.href.replace(URL.HOME, URL.PRODUCT_VIEW));
  }

  addTocart(data:Product){
    if (this.storage.read(AUTH.TOKEN) == null) {
      this.toastService.openSnackBar(success_message.ERROR_RATING, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      this.dialog.open(LoginComponent);
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: data
      };
      this.dialog.open(MakeOrderComponent, dialogConfig);
    }
  }

  getRecommendedProduct(){
    if(this.adminService.usersStorage()!=null){
      this.productService.getUserBasedRecommendedProducts(this.adminService.usersStorage().id).subscribe
      (
        (response) => {
          this.recommended = response;
          console.log(this.recommended)
        },
        (error) => console.log(error),
      );
    }
  }
}
