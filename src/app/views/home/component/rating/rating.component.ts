import { StorageService } from './../../../../common/service/storage/storage.service';
import { AdminService } from './../../../../common/service/admin/admin.service';
import { ToastService } from './../../../../common/service/toast/toast.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/common/model/product';
import { RatingService } from 'src/app/common/service/rating/rating.service';
import { Rating } from 'src/app/common/model/rating';
import { success_message } from 'src/app/common/constants/messages';
import { AUTH } from 'src/app/common/constants/global-variables.constant';



@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public id: string;
  public product: Product;
  public rating: number = 0;
  public ratings: Rating;
  private update: boolean = false;
  constructor(
    private toastService: ToastService,
    private ratingService: RatingService,
    private adminService: AdminService,
    public rat: Rating,
    private storage: StorageService,
    private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.id = data.id;
  }
  ngOnInit(): void {
    this.ratingService.getRating(this.id, this.adminService.usersStorage().id).subscribe
      (
        (response) => {
          this.ratings = response;
          if (this.ratings != null) {
            this.rating = this.ratings.ratingValue;
            this.update = true;
          }
        }, (error) => {
        });
  }


  close() {
    this.dialogRef.close();
  }
  submit() {
    if(this.update==false){
      this.createRating();
    }else{
      this.updateRating();
    }
  }
  createRating() {
    this.rat.productId = this.id;
    this.rat.ratingValue = this.rating;
    this.rat.userId = this.adminService.usersStorage().id;
    this.ratingService.addrating(this.rat).subscribe
      (
        (response) => {
          this.dialogRef.close();
          this.toastService.openSnackBar(success_message.RATING_SUCCESS, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        }, (error) => {
          this.toastService.openSnackBar(success_message.RATING_FAIL, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        });
  }
  updateRating() {
    this.ratings.ratingValue = this.rating;
    this.ratingService.addrating(this.ratings).subscribe
      (
        (response) => {
          this.dialogRef.close();
          this.toastService.openSnackBar(success_message.RATING_UPDATE_SUCCESS, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        }, (error) => {
          this.toastService.openSnackBar(success_message.RATING_UPDATE_FAIL, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        });
  }
}
