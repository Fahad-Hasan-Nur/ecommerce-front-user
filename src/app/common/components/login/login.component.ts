import { AuthService } from './../../service/auth/auth.service';
import { LoginService } from './../../service/login/login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { success_message } from '../../constants/messages';
import { User } from '../../model/user';
import { AdminService } from '../../service/admin/admin.service';
import { StateService } from '../../service/state/state.service';
import { StorageService } from '../../service/storage/storage.service';
import { ToastService } from '../../service/toast/toast.service';
import { RegisterComponent } from '../register/register.component';
import { TOKEN } from '../../constants/storage-variables.constant';
import { URL } from '../../constants/nav.constants';
import { AUTH } from '../../constants/global-variables.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit {
  public loading: boolean;


  constructor(
    private storage: StorageService,
    private stateService: StateService,
    public user: User,
    private adminService: AdminService,
    private toastService: ToastService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    private loginService: LoginService,
    private auth:AuthService
  ) { }

  public ngOnInit() {
    this.setStateAuth(this.user);
  }
  public setStateAuth(user: User): void {
    this.stateService.setAuth(user);
  }



  public login() {
    this.loading = true;

    this.loginService.login(this.stateService.getAuth()).subscribe(
      (res) => {
        this.loading=false;
        this.auth.saveToken(res.jwt);
        this.toastService.openSnackBar(success_message.LOGIN_SUCCES, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
        this.loading=false;
        this.toastService.openSnackBar(err.error.text, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);

      });

  }
  register() {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef.close();
    this.dialog.open(RegisterComponent);
  }

}
