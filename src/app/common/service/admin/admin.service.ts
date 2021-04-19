import { ADMIN_API } from './../../constants/api.constants';
import { User } from './../../model/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_API } from '../../constants/api.constants';
import { StorageService } from '../storage/storage.service';
import { AUTH } from '../../constants/global-variables.constant';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
  });

  constructor(private _http: HttpClient,
   private storage: StorageService
    ) { }

  public usersStorage(): User {
    return this.storage.read(AUTH.CURRENT_USER)
  }
  /**
  * get admin info by admin email
  * @param adminEmail
  * @returns Admin
  */
  public getAdminInfo(email: any): Observable<any> {
    // @ts-ignore
    return this._http.get(ADMIN_API.GET_ADMIN_BY_EMAIL + email, { headers: this.reqHeader });
  }
  // /**
  // * get admin info by admin id
  // * @param id
  // * @returns Admin
  // */
  //  public getAdminById(id: any): Observable<any> {
  //   // @ts-ignore

  //   return this._http.get(ADMIN_API.GET_ADMIN_BY_ID + id, { headers: this.reqHeader });
  // }

  /**
   * create a new Dealer.
   *
   * @param dealer
   * @returns dealer
   */
   public addDealer(user: User): Observable<any>{
    return this._http.post(LOGIN_API.REGISTRATION, user);
  }

  // /**
  //  * Update a  admin.
  //  *
  //  * @param admin
  //  * @returns admin
  //  */
  // public updateAdmin(admin: Admin) {
  //   return this._http.put(ADMIN_API.UPDATE_ADMIN, admin, { headers: this.reqHeader });
  // }

  //  /**
  //  * Returns list of active dealer.
  //  *
  //  * @returns Admin list
  //  */
  //   public getActiveDealers(): Observable<any> {
  //     return this._http.get(ADMIN_API.GET_ACTIVE_DEALER, { headers: this.reqHeader });
  //   }
 
  //   /**
  //  * Returns verify dealer.
  //  *
  //  * @returns dealer 
  //  */
  //    public verifyDealer(id:string): Observable<any> {
  //     return this._http.get(ADMIN_API.VERIFY_DEALER+id, { headers: this.reqHeader });
  //   }

      /**
   * Returns Activated user.
   *
   * @returns user 
   */
       public activateUser(token:string): Observable<any> {
        return this._http.get(LOGIN_API.ACTIVATE+token);
      }
} 

