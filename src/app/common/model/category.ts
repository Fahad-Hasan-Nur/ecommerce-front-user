import { SubCategory } from './sub-category';
import { Injectable } from "@angular/core";

@Injectable()
export class Category {
    public id?: string;
    public name?: string ;
    public description?: string ;
    public createdBy?: string;
    public updatedBy?: string;
    public subCategory?: SubCategory[];
  }
  