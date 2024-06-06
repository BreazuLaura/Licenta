import {User} from "./user";

export interface Bid{
  id?: number;
  amount?: number;
  bidTime? : Date;
  user?: User;

}
