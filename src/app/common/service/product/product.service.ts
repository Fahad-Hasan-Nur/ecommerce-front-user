
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_API } from '../../constants/api.constants';
import { Product } from '../../model/product';
import { Variation } from '../../model/variation';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  constructor(private _http: HttpClient) { }

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
   * Returns list of variation.
   *
   * @returns variation list
   */
   public getVariations(id): Observable<any>{
    return this._http.get(PRODUCT_API.GET_VARIATION_BY_PRODUCT_ID+id);
  }

}
