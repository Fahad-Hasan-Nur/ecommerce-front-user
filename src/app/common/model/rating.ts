
import { Injectable } from "@angular/core";

@Injectable()
export class Rating {
  public id ?: string;
  public productId?: string ;
  public userId?: string ;
  public ratingValue?: number ;
}
