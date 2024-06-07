import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';  // Ensure jQuery UI is imported

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    droppable: true,
    events: [], // Define events here
    eventReceive: this.handleEventReceive.bind(this) // Bind the function to the component context
  };

  constructor() { }

  ngOnInit(): void {
    this.loadEvents();
    this.initializeDraggableEvents();
  }

  loadEvents(): void {
    // Load events from your backend or define static events
    this.calendarOptions.events = [
      { title: 'Event 1', date: '2024-06-10', color: 'green' },
      { title: 'Event 2', date: '2024-06-15', color: 'blue' }
    ];
  }

  initializeDraggableEvents(): void {
    setTimeout(() => {
      ($('#external-events .fc-event') as any).each((index: any, element: any) => {
        const eventObject = {
          title: $.trim($(element).text()) // Use arrow function for correct `this` context
        };
        $(element).data('eventObject', eventObject);
        // @ts-ignore
        $(element).draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0
        });
      });
    }, 1000);
  }

  handleEventReceive(eventInfo: any): void {
    console.log('Event received', eventInfo);
  }

  addNewEvent(): void {
    const eventTitle = (document.getElementById('new-event') as HTMLInputElement).value;
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        date: new Date().toISOString().split('T')[0], // Example date, replace with a date picker value
        color: 'yellow'
      };
      // @ts-ignore
      this.calendarOptions.events = [...(this.calendarOptions.events || []), newEvent];
    }
  }
}
