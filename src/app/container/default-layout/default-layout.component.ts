import { StorageService } from './../../common/service/storage/storage.service';
import { LoginComponent } from './../../common/components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/common/components/register/register.component';
import { AuthService } from 'src/app/common/service/auth/auth.service';
import { AUTH } from 'src/app/common/constants/global-variables.constant';




@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public loggedin: boolean=false;
  constructor(
              protected dialog: MatDialog,
              private authService: AuthService,
              private storage: StorageService
    ) { }

  ngOnInit(): void {
    if(this.storage.read(AUTH.CURRENT_USER)!=null){
      this.loggedin=true;
    }
  }

  login() {
    this.dialog.open(LoginComponent);
  }

  register() {
    this.dialog.open(RegisterComponent);
  }

  logOut(){
    this.authService.logout();
    this.loggedin=false;
  }
}
