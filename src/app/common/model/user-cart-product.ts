import { Product } from 'src/app/common/model/product';
import { Variation } from "./variation";


export class UserCartProduct {
  public id ?: string;
  public product?: Product;
  public productName?: string ;
  public productId?: string ;
  public userId?: string ;
  public createdBy?: string;
  public updatedBy?: string;
  public color?: string;
  public totalCost?: number;
  public status?:string;
  public variationId?: string;
  public variationName?: string;
  public quantity?:number;
  public variation?:Variation;
  public brandName?:string;
  public image?:any;
  public orderId?:string;
}
