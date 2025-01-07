import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CATEGORY_API } from '../../constants/api.constants';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

// constructor(private _http: HttpClient,private storage: StorageService) { }
constructor(private _http: HttpClient) { }

// private  reqHeader= new HttpHeaders({ 
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
// });
  /**
   * Returns list of category.
   *
   * @returns Product list
   */
  public getCategory(): Observable<any>{
    return this._http.get(CATEGORY_API.GET_CATEGORY);
  }



  public getCategoryList(): Observable<any>{
    return this._http.get(CATEGORY_API.GET_CATEGORY_LIST);
  }
//   /**
//    * create a new category.
//    *
//    * @param category
//    * @returns category
//    */
//   public addCategory(category:Category){
//     return this._http.post(CATEGORY_API.ADD_CATEGORY,category,{ headers: this.reqHeader });
//   }
//    /**
//    * Returns single category by id.
//    *
//    * @returns category 
//    */
//   public getCategoryById(id): Observable<any> {
//     return this._http.get<Category>(CATEGORY_API.GET_CATEGORY_BY_ID + id,{ headers: this.reqHeader });
// }
//  /**
//    * Update a  Category.
//    *
//    * @param Category
//    * @returns CAtegory
//    */
//   public updateCategory(category:Category){
//     return this._http.put(CATEGORY_API.UPDATE_CATEGORY,category,{ headers: this.reqHeader });
//   }
}
