import { Injectable } from "@angular/core";

@Injectable()
export class Variation {
    public id?: string;
    public name?: string ;
    public price?: number ;
    public quantity?: number ;
    public discount?: number ;
    public createdBy?: string;
    public updatedBy?: string;
    public productId?: string;
    public productName?: string;
  }
  