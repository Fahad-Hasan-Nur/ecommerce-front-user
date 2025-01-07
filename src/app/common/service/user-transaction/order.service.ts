import { USER_ORDER_API, DELIBVARY_CONTACT_INFO_API, DELIBVARY_LOCATION_INFO_API } from './../../constants/api.constants';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AUTH } from "../../constants/global-variables.constant";
import { UserOrder } from "../../model/user-order";
import { StorageService } from "../storage/storage.service";
import { Observable } from 'rxjs';
import { DelivaryContactInfo } from '../../model/delivary-contact-info';
import { DelivaryLocationInfo } from '../../model/delivary-location-info';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storage.read(AUTH.TOKEN)
    });
   

    constructor(private _http: HttpClient,
        private storage: StorageService
    ) { }

    /**
   * create a new UserOrder.
   *
   * @param UserOrder
   * @returns UserOrder
   */
    public addUserOrder(userOrder: UserOrder) {
        return this._http.post(USER_ORDER_API.ADD_USER_ORDER, userOrder, { headers: this.reqHeader });
    }

    /**
   * Returns  UserOrder by user id.
   *
   * @returns UserOrder 
   */
    public getUserOrderByUserId(id): Observable<any> {
        return this._http.get<UserOrder>(USER_ORDER_API.GET_USER_ORDER_BY_USER_ID + id, { headers: this.reqHeader });
    }
    /**
    * create a new DelivaryContactInfo.
    *
    * @param DelivaryContactInfo
    * @returns DelivaryContactInfo
    */
    public addDelivaryContactInfo(delivaryContactInfo: DelivaryContactInfo) {
        return this._http.post(DELIBVARY_CONTACT_INFO_API.ADD_DELIVARY_CONTACT_INFO, delivaryContactInfo, { headers: this.reqHeader });
    }

    /**
* Returns  DelivaryContactInfo by  id.
*
* @returns DelivaryContactInfo 
*/
    public getDelivaryContactInfoById(id): Observable<any> {
        return this._http.get<DelivaryContactInfo>(DELIBVARY_CONTACT_INFO_API.GET_DELIVARY_CONTACT_INFO_BY_ID + id, { headers: this.reqHeader });
    }
    /**
      * create a new DelivaryLocationInfo.
      *
      * @param DelivaryLocationInfo
      * @returns DelivaryLocationInfo
      */
    public addDelivaryLocationInfo(delivaryLocationInfo: DelivaryLocationInfo) {
        return this._http.post(DELIBVARY_LOCATION_INFO_API.ADD_DELIBVARY_LOCATION_INFO, delivaryLocationInfo, { headers: this.reqHeader });
    }

    /**
 * Returns  DelivaryContactInfo by  id.
 *
 * @returns DelivaryContactInfo 
 */
    public getDelivaryLocationInfoById(id): Observable<any> {
        return this._http.get<DelivaryLocationInfo>(DELIBVARY_LOCATION_INFO_API.GET_DELIBVARY_LOCATION_INFO_BY_ID + id, { headers: this.reqHeader });
    }

}