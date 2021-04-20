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
import { AuthGuard } from '../../service/auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    private auth: AuthGuard
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
        this.storage.save(AUTH.TOKEN, res.jwt);
        this.loading = false;
        if(this.storage.read(AUTH.TOKEN)!=null){
          console.log()
          this.getUser();
        }
        else{
          this.toastService.openSnackBar(success_message.LOGIN_FAIL, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        }
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.toastService.openSnackBar(err.error.text, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      });

  }
  getUser() {
    this.adminService.getAdminInfo(this.user.email).subscribe(
      res => {
        this.user = res;
        this.stateService.setUser(this.user);
        this.storage.save(AUTH.CURRENT_USER, this.user);
        this.storage.save(AUTH.ROLES, this.user.role);
        this.toastService.openSnackBar(success_message.LOGIN_SUCCES, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        window.location.replace(window.location.href.replace(URL.HOME, URL.HOME));
      },
      err => {
        console.log(err);
      })
  }

  register() {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef.close();
    this.dialog.open(RegisterComponent);
  }

}
