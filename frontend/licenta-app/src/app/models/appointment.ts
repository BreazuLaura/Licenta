import {Service} from "./service";

export class Appointment {
  id?: number;
  startTime!: string; // Using string to handle date-time format easily
  endTime!: string;   // Using string to handle date-time format easily
  service!: Service;
  ownerId!: number;
  buyerId?: number;
  status!: string;
}
