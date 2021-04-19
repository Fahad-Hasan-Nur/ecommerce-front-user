import { DecodeToken } from './../../model/decode-token';
import { TOKEN } from './../../constants/storage-variables.constant';
import { User } from './../../model/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import {environment} from "../../../../environments/environment";
import { StateService } from '../state/state.service';
import { AdminService } from '../admin/admin.service';
import { AUTH } from '../../constants/global-variables.constant';
import  jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router,
             private storage:StorageService,
             private stateService: StateService,
             private adminService :AdminService) {
  }

  public getDecodedAccessToken(token: string): Promise<User> {
    return new Promise((resolved,reject) =>{
      try {
        this.storage.save(AUTH.TOKEN, token);
        let user = new User();
        let tokenValue=new DecodeToken();
         tokenValue = jwt_decode(token);
        user.email = tokenValue.sub;
        resolved(user);
      } catch (error) {
        console.log('token decode exception');
        console.log(error)
        this.router.navigate(['/unauthorized']);
        resolved(null);
      }
    })
  }

  public async saveToken(params:any):  Promise<boolean> {
    return await this.currentUserSave(await this.getDecodedAccessToken(params));
  }

  private currentUserSave(user: User): Promise<boolean> {
   return new Promise((resolved,reject) =>{
    this.adminService.getAdminInfo(user.email).subscribe(
      res => {
        user = res;
        this.stateService.setUser(user);
        this.storage.save(AUTH.CURRENT_USER, user);
        this.storage.save(AUTH.ROLES,user.role);
        resolved(true);
      },
      err => {
       console.log(err);
       resolved(false);
       this.router.navigate(['/unauthorized']);
      })
   })

  }

  public isTokenValid(user: User): boolean {
    if (user) {
      return true;
    } else {
      return false;
    }
  }
 
  public logout() {
    localStorage.clear();
    this.storage.clear();
    }
}


