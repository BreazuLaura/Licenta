import {User} from "./user";

export interface Service {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  dorm: string;
  owner?: User;
}
