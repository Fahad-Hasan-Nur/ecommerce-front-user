import { UserCartProduct } from './user-cart-product';
export class UserOrder {
    public id ?: string;
    public createdBy?: string;
    public updatedBy?: string;
    public userId?: string ;
    public delivaryLocationInfoId?: string ;
    public delivaryContactInfoId?: string ;
    public paymentMethod?: string ;
    public paymentInfo?: string ;
    public totalCost?:number;
    public status?:string;
    public userCartProduct?:UserCartProduct[];
  }