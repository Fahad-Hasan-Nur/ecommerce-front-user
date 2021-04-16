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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public category: Category[] = [];
  public brand: Brand[] = [];
  public product: Product[] = [];
  public dataSource = new MatTableDataSource;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;

  constructor(private categoryService: CategoryService,
              private subCategoryService: SubCategoryService,
              private brandService: BrandService,
              private productService: ProductService,
              private imageService:ImageService) { }

  ngOnInit(): void {
    this.getCategory();
    this.getBrand();
    this.getProduct();
  }

  getCategory(){
    this.categoryService.getCategory().subscribe
    (
      (response) => {
        response.forEach(element => {
          element=this.getSubCategory(element);
        });
        this.category=response;
        console.log(this.category)
      },
      (error) => console.log(error),
    );
  }

  getBrand(){
    this.brandService.getBrand().subscribe
    (
      (response) => {
        this.brand=response;
        console.log(this.brand)
      },
      (error) => console.log(error),
    );
  }

  getSubCategory(category:Category):Category{
    this.subCategoryService.getSubCategoryByCategoryId(category.id).subscribe
    (
      (response) => {
        category.subCategory=response
      },
      (error) => console.log(error),
    );
    return category;
  }

  getProduct(){
    this.productService.getProducts().subscribe
    (
      (response) => {
        this.product=response;
        this.product.forEach(element => {
          element=this.getImage(element);
        });
        console.log(this.product)
      },
      (error) => console.log(error),
    );
  }

  getImage(product:Product):Product{

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

}
