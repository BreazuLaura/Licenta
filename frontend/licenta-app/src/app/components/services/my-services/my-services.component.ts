import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  // Add AfterViewInit
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import FullCalendarComponent from @fullcalendar/angular
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent; // Get reference to calendar

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
    const externalEventsContainerEl = document.getElementById('external-events-list');
    if (externalEventsContainerEl) {
      new Draggable(externalEventsContainerEl, {
        itemSelector: '.fc-event',
        eventData: (eventEl: HTMLElement) => {
          return {
            title: eventEl.innerText,
            duration: { days: 1 }, // Set default duration to one day
            allDay: true           // Make events all-day
          };
        }
      });
    }
  }

  handleEventReceive(eventInfo: any) {
    // Access the FullCalendar API directly if needed
    const calendarApi = this.calendarComponent.getApi();
    // Add event to calendar directly
    calendarApi.addEvent(eventInfo.event);
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
