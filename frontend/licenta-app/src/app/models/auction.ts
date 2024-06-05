import {Product} from "./product";

export interface Auction {
  imageSrc?: string;
  id?: number;
  product: Product;
  startPrice: number;
  endDate?: Date;
  currentHighestBid?: number;
}
