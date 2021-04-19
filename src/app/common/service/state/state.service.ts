
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../../model/auth';

import { User } from '../../model/user';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private currentUserState!: BehaviorSubject<User>;
  private currentAuthState!: BehaviorSubject<Auth>;

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
   * get current Admin.
   *
   * @return currentAdminState
   */
  public getUser(): User{
    return this.currentUserState.value;
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
