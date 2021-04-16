import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  hide:boolean=false;
  constructor(    private dialogRef: MatDialogRef<RegisterComponent>,
    ) { }
  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}



