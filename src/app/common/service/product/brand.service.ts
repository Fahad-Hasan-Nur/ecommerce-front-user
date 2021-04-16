
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BRAND_API } from '../../constants/api.constants';
import { Brand } from '../../model/brand';

 
@Injectable({
  providedIn: 'root'
})
export class BrandService {

constructor(private _http: HttpClient) { }


   /**
   * Returns list of products.
   *
   * @returns Product list
   */
  public getBrand(): Observable<any>{
    return this._http.get(BRAND_API.GET_BRAND);
  }
  
   /**
   * Returns single brand by id.
   *
   * @returns Brand 
   */
  public getBrandById(id): Observable<any> {
    return this._http.get<Brand>(BRAND_API.GET_BRAND_BY_ID + id);
}

}
