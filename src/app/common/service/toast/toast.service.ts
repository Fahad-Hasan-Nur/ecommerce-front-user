import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public CLASS_NAME_SUCESS = 'blue-snackbar';
  public CLASS_NAME_WRONG = 'red-snackbar';
  public ACTION_SUCESS = 'OK';
  public ACTION_WRONG ='';

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: "end",
      panelClass: [className],
    });
  }
}
