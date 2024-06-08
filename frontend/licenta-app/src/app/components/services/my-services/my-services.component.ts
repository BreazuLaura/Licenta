import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // Note: Import Draggable from here
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    editable: true,
    droppable: true,
    events: [] as EventInput[],
    eventReceive: this.handleEventReceive.bind(this)
  };

  constructor() { }

  ngOnInit(): void {
    this.loadEvents();
    this.initializeDraggableEvents();
  }

  loadEvents(): void {
    // ... (Your event loading logic) ...
  }

  initializeDraggableEvents(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const draggableEl = document.getElementById('external-events-list');
      if (draggableEl) {
        new Draggable(draggableEl, { // No namespace, Draggable is a class
          itemSelector: '.fc-event',
          eventData: (eventEl: HTMLElement) => ({ // Explicitly typed
            title: eventEl.innerText,
          })
        });
      }
    });
  }

  handleEventReceive(eventInfo: any): void {
    // ... (Your event handling logic) ...
  }

  addNewEvent(): void {
    const eventTitle = (document.getElementById('new-event') as HTMLInputElement).value;
    if (eventTitle) {
      const newEvent: EventInput = {
        title: eventTitle,
        start: new Date().toISOString().split('T')[0],
        allDay: true,
        color: this.getRandomColor()
      };

      const currentEvents = this.calendarOptions.events || [];
      // @ts-ignore
      this.calendarOptions.events = [...currentEvents, newEvent];
    }
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
