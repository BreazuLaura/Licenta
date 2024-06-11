import {Service} from "./service";
import {User} from "./user";

export class Appointment {
  id?: number;
  startTime!: string; // Using string to handle date-time format easily
  endTime!: string;   // Using string to handle date-time format easily
  service!: Service;
  ownerId!: number;
  buyer?: User;
  status!: string;
}
