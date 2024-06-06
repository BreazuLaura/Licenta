import { Component, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CalendarOptions} from "@fullcalendar/core"; // Import plugins

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Service 1', start: '2024-06-07', end: '2024-06-10' },
      { title: 'Service 2', start: '2024-06-10' }
    ],
    editable: true,
    droppable: true // Make events draggable
  };

  constructor() { }

  ngOnInit(): void {
    // Load any additional initializations here
  }
}
