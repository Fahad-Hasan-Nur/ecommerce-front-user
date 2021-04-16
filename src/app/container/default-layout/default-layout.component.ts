import { LoginComponent } from './../../common/components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/common/components/register/register.component';




@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  constructor(protected dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login() {
    this.dialog.open(LoginComponent);
  }

  register() {
    this.dialog.open(RegisterComponent);
  }
}
