
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_API, USER_API } from '../../constants/api.constants';
import { AUTH } from '../../constants/global-variables.constant';
import { Product } from '../../model/product';
import { UserCartProduct } from '../../model/user-cart-product';
import { Variation } from '../../model/variation';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserTransactionService {
 
    private reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
      });

      constructor(private _http: HttpClient,
        private storage: StorageService
         ) { }
 /**
   * create a new userCartProduct.
   *
   * @param userCartProduct
   * @returns userCartProduct
   */
  public addUserCartProduct(userCartProduct:UserCartProduct){
    return this._http.post(USER_API.ADD_USER_CART_PRODUCT,userCartProduct,{ headers: this.reqHeader });
  }

    /**
   * Returns list of userCartProduct.
   *
   * @returns userCartProduct list by On Cart
   */
   public getCartProduct(id): Observable<any>{
    return this._http.get(USER_API.GET_CART_PRODUCT+id,{ headers: this.reqHeader });
  }
  /**
   * Returns  Delete userCartProduct.
   *
   * @returns userCartProduct 
   */
   public deleteUserCartProductById(id:string): Observable<any> {
    return this._http.delete(USER_API.DELETE_CART_PRODUCT+id ,{ headers: this.reqHeader });
}
//   /**
//    * create list of variation.
//    *
//    * @param variation
//    * @returns variation
//    */
//    public addVariation(variation:Variation[]){
//     return this._http.post(PRODUCT_API.ADD_VARIATION,variation,{ headers: this.reqHeader });
//   }
//   /**
//    * Update a  product.
//    *
//    * @param product
//    * @returns product
//    */
//   public updateProduct(product:Product){
//     return this._http.put(PRODUCT_API.UPDATE_PRODUCT,product,{ headers: this.reqHeader });
//   }
//     /**
//    * Returns list of products.
//    *
//    * @returns Product list
//    */
//   public getProducts(): Observable<any>{
//     return this._http.get(PRODUCT_API.GET_PRODUCTS,{ headers: this.reqHeader });
//   }

//   /**
//    * Returns single product by id.
//    *
//    * @returns Product 
//    */
//   public getProductById(id): Observable<any> {
//       return this._http.get<Product>(PRODUCT_API.GET_PRODUCT_BY_ID + id,{ headers: this.reqHeader });
// }
// /**
//    * get list of  product by sub category id .
//    *
//    */
//  public getProductBySubCategoryId(data): Observable<Product[]> {
//   return this._http.get<Product[]>(PRODUCT_API.GET_PRODUCT_BY_SUB_CATEGORY_ID + data, { headers: this.reqHeader });
// }
//   /**
//    * Returns list of variation.
//    *
//    * @returns variation list
//    */
//    public getVariations(id): Observable<any>{
//     return this._http.get(PRODUCT_API.GET_VARIATION_BY_PRODUCT_ID+id,{ headers: this.reqHeader });
//   }
//   /**
//    * Update a  Variation.
//    *
//    * @param Variation
//    * @returns Variation
//    */
//    public updateVariation(variation:Variation){
//     return this._http.put(PRODUCT_API.UPDATE_VARIATION,variation,{ headers: this.reqHeader });
//   }

}
