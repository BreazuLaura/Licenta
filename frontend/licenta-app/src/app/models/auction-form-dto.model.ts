// auction-form-dto.model.ts
import { Category, Dorm, SaleType, Status } from './enums';
import {Time} from "@angular/common";

export class AuctionFormDTO {
  name?: string;
  price?: number;
  description?: string;
  contactInfo?: string;
  category?: Category;
  status: Status = Status.AVAILABLE; // Default value
  saleType: SaleType = SaleType.AUCTIONPLACE; // Default value
  dorm?: Dorm;
  startPrice?: number;
  endTime?: string;
  endDate?: Date;
  endDateTime?: string;

}
