import { RATING_API } from './../../constants/api.constants';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Rating } from '../../model/rating';
import { Observable } from 'rxjs';
import { AUTH } from '../../constants/global-variables.constant';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class RatingService {
 private  reqHeader= new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });

  constructor(private _http: HttpClient,
    private storage: StorageService) { }

  /**
   * create a new rating.
   *
   * @param rating
   * @returns rating
   */
  public addrating(rating:Rating){
    return this._http.post(RATING_API.ADD_RATING,rating,{ headers: this.reqHeader });
  }

  /**
   * grt rating by product and user id.
   *
   * @param rating
   * @returns rating
   */
   public getRating(pId:string,uId:string): Observable<any>{
    const param = new HttpParams()
    .set('pId',pId)
    .set('uId',uId);
  const options = { params: param, headers: this.reqHeader };
    return this._http.get(RATING_API.GET_RATTING,options);
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
  /**
   * Update a  rating.
   *
   * @param rating
   * @returns rating
   */
  public updateRating(rating:Rating){
    return this._http.put(RATING_API.UPDATE_RATING,rating,{ headers: this.reqHeader });
  }
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
