import {User} from "./user";

export class Notification {
  id?: number;
  notificationType?: string;
  elementId?: number;
  text?: string;
  timestamp?: string;
  sender?: User;
  receiver?: {
    id: number;
    name: string;
    image?: string;
  };
}
