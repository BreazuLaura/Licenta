import {Product} from "./product";
import {SafeUrl} from "@angular/platform-browser";

export interface Auction {
  imageSrc?: SafeUrl;  id?: number;
  product: Product;
  startPrice: number;
  endDate?: Date;
  currentHighestBid?: number;
}
