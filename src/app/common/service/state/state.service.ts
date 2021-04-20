import { ProductViewComponent } from './../../../views/home/component/product-view/product-view.component';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../../model/auth';
import { Product } from '../../model/product';

import { User } from '../../model/user';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentUserState!: BehaviorSubject<User>;
  private currentAuthState!: BehaviorSubject<Auth>;
  private currentProductState!: BehaviorSubject<Product>;

  /**
   *
   * set current admin
   *
   * @param admin
   */
   public async setUser(admin: User) {
    await new Promise((resolve,rejects) => {
      if (this.currentUserState === undefined) this.currentUserState = new BehaviorSubject<User>(admin);
    });
    await this.currentUserState.next(admin);
  }

   /**
   *
   * set current product
   *
   * @param product
   */
    public async setProduct(product: Product) {
      await new Promise((resolve,rejects) => {
        if (this.currentProductState === undefined) this.currentProductState = new BehaviorSubject<Product>(product);
      });
      await this.currentProductState.next(product);
    }
  
  /**
   *
   * get current Admin.
   *
   * @return currentAdminState
   */
  public getUser(): User{
    return this.currentUserState.value;
  }

  /**
   *
   * get current product.
   *
   * @return currentProductState
   */
   public getProduct(): Product{
    return this.currentProductState.value;
  }
 
  /**
   *
   * set current auth.
   *
   * @param auth
   */
  
  public async setAuth(auth: Auth) {
    await new Promise((resolve,rejects) => {
      if (this.currentAuthState === undefined) this.currentAuthState = new BehaviorSubject<Auth>(auth);
    });
    await this.currentAuthState.next(auth);
  }

 /**
   * get current auth.
   *
   * @return currentAuth
   */
  public getAuth(): Auth{
    return this.currentAuthState.value;

}
}
