import {Product} from "./product";
import {SafeUrl} from "@angular/platform-browser";
import {Bid} from "./bid";
import {User} from "./user";

export interface Auction {
  imageSrc?: SafeUrl;  id?: number;
  product: Product;
  startPrice: number;
  endDate?: Date;
  currentHighestBid?: Bid;
  bids? : Bid[];
  endTime? : string;
}
