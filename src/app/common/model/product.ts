
import { Injectable } from "@angular/core";

@Injectable()
export class Product {
  public id ?: string;
  public name?: string ;
  public code?: string ;
  public categoryName?: string ;
  public categoryId?: string ;
  public brandName?: string ;
  public brandId?: string ;
  public subCategoryName?: string ;
  public subCategoryId?: string ;
  public imageId?: string ;
  public imageName?: string ;
  public createdBy?: string;
  public updatedBy?: string;
  public color?: string[];
  public image?: any;
  public description?:string;

}
