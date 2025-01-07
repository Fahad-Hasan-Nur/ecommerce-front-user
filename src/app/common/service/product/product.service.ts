import { RECOMMENDATION_API } from './../../constants/api.constants';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_API } from '../../constants/api.constants';
import { AUTH } from '../../constants/global-variables.constant';
import { Product } from '../../model/product';
import { Variation } from '../../model/variation';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private  reqHeader= new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });
  
  constructor(private _http: HttpClient,
    private storage: StorageService) { }

    /**
   * Returns list of products.
   *
   * @returns Product list
   */
  public getProducts(): Observable<any>{
    return this._http.get(PRODUCT_API.GET_PRODUCTS);
  }

  /**
   * Returns single product by id.
   *
   * @returns Product 
   */
  public getProductById(id): Observable<any> {
      return this._http.get<Product>(PRODUCT_API.GET_PRODUCT_BY_ID + id);
}
/**
   * get list of  product by sub category id .
   *
   */
 public getProductBySubCategoryId(data): Observable<Product[]> {
  return this._http.get<Product[]>(PRODUCT_API.GET_PRODUCT_BY_SUB_CATEGORY_ID + data);
}

/**
   * get list of  product by  category id .
   *
   */
 public getProductByCategoryId(data): Observable<Product[]> {
  return this._http.get<Product[]>(PRODUCT_API.GET_PRODUCT_BY_CATEGORY_ID + data);
}

/**
   * get list of  product by brand id .
   *
   */
 public getProductByBrandId(data): Observable<Product[]> {
  return this._http.get<Product[]>(PRODUCT_API.GET_PRODUCT_BY_BRAND_ID + data);
}

/**
   * get list of  product by name .
   *
   */
 public getProductByName(name): Observable<Product[]> {
  return this._http.get<Product[]>(PRODUCT_API.GET_PRODUCT_BY_NAME + name);
}
  /**
   * Returns list of variation.
   *
   * @returns variation list
   */
   public getVariations(id): Observable<any>{
    return this._http.get(PRODUCT_API.GET_VARIATION_BY_PRODUCT_ID+id);
  }

  /**
   * Returns   variation.
   *
   * @returns variation 
   */
   public getVariationById(id): Observable<any>{
    return this._http.get(PRODUCT_API.GET_VARIATION_BY_ID+id,{ headers: this.reqHeader });
  }

   /**
   * Returns list of  recommended products for user.
   *
   * @returns Product list
   */
    public getUserBasedRecommendedProducts(id:string): Observable<any>{
      return this._http.get(RECOMMENDATION_API.GET_USER_RECOMMENDED_PRODUCT+id ,{ headers: this.reqHeader });
    }

     /**
   * Returns list of  recommended products by item.
   *
   * @returns Product list
   */
      public getItemBasedRecommendedProducts(id:string): Observable<any>{
        return this._http.get(RECOMMENDATION_API.GET_ITEM_RECOMMENDED_PRODUCT+id);
      }

}
