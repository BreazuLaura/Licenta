// auction-form-dto.model.ts
import { Category, Dorm, SaleType, Status } from './enums';

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
  endDate?: Date;
}
