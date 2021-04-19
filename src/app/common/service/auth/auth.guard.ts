import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { AUTH } from '../../constants/global-variables.constant';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private storage: StorageService,
    private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let userInfo = <User>this.storage.read(AUTH.CURRENT_USER);

    if (this.storage.read(AUTH.TOKEN) !== null && this.authService.isTokenValid(userInfo)) {

      return true;

    } else if (next.queryParams[AUTH.TOKEN] !== undefined) {

      observableOf(next.queryParams).subscribe(params => {

        if (params[AUTH.TOKEN]) {
          return this.saveUserToken(params[AUTH.TOKEN]);
        } else {
          console.log(params);
        }

      }, error => {
        console.log(error);

      });


    } else if (next.queryParams[AUTH.TOKEN] === undefined) {
      return this.router.createUrlTree(['/page-not-found']);
    }else{
      return this.router.createUrlTree(['/page-not-found']);
    }
  }

  private async saveUserToken(token: string) {
    return (await this.authService.saveToken(token) && await this.clearUrl())?true:this.router.navigate(['/unauthorized']);
  }

  private clearUrl(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Remove query params
      this.router.navigate([], {
        queryParams: null,
        queryParamsHandling: 'merge'
      })
      setTimeout(() => {
        resolve(true);
      }, 3000);
    })
  }


}
