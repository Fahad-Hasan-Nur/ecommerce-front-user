import { LoginComponent } from './../login/login.component';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { success_message } from '../../constants/messages';
import { StateService } from '../../service/state/state.service';
import { Auth } from '../../model/auth';
import { ToastService } from '../../service/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public loading: boolean;
  public token: string = null;
  public error: boolean = true;
  public myFilter: any;


  constructor(
    private stateService: StateService,
    public user: User,
    private adminService: AdminService,
    private toastService: ToastService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterComponent>,
  ) { }

  public ngOnInit() {
    this.setStateUser(this.user);
  }
  public setStateUser(user: User): void {
    this.stateService.setUser(user);
  }



  public register() {
    this.loading = true;
     this.user.createdBy=this.user.name;
     this.user.role='USER';
     this.user.verified=false;
     console.log(this.stateService.getUser())
     this.adminService.addDealer(this.stateService.getUser()).subscribe
       (
         (response) => {
           console.log(response);
           this.toastService.openSnackBar(success_message.MAIL, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
            this.loading = false;
         }, (error) => {
           console.log(error.error.text);
           this.toastService.openSnackBar(error.error.text, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loading = false;
         });
  }
  login() {
    const dialogConfig = new MatDialogConfig();
    this.dialogRef.close();
    this.dialog.open(LoginComponent);
  }

}
