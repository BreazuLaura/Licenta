import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  // Add AfterViewInit
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import FullCalendarComponent from @fullcalendar/angular
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {Router} from "@angular/router";
import {ServiceService} from "../../../services/service.service";
import {Auction} from "../../../models/auction";
import {Service} from "../../../models/service";


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
    // eventReceive: this.handleEventReceive.bind(this),
    drop: this.handleEventDrop.bind(this)

  };
  userId: number;
  services: Service[] = [];
  serviceColors: { [id: number]: string } = {};

  initCalendar(): void {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      themeSystem: 'bootstrap',
      editable: true,
      droppable: true,
      events: [],
      drop: this.handleEventDrop.bind(this),
      eventReceive: (info) => {
        // Adjust the event end time to reflect the correct service duration
        const event = info.event;
        const draggedServiceName = event.title.trim();
        const service = this.services.find(s => s.name === draggedServiceName);

        if (service) {
          event.setEnd(new Date(event.start!.getTime() + service.duration * 60 * 60 * 1000));
        }
      }
    };
  }



  constructor(private router: Router, private serviceService: ServiceService) {
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? parseInt(userIdStr, 10) : 0;
  }

  ngOnInit(): void {
    this.loadServices();
    this.initializeDraggableEvents();
    this.initDraggableEvents();
    this.initCalendar();


  }

  loadServices(): void {
    this.serviceService.getServicesByUserId(this.userId).subscribe(
      (services: Service[]) => {
        this.services = services;
        this.assignRandomColors();
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );
  }

  initDraggableEvents(): void {
    const containerEl = document.getElementById('external-events')!;

    new Draggable(containerEl, {
      itemSelector: '.draggable-event',
      eventData: (eventEl: HTMLElement) => {
        const draggedServiceName = eventEl.innerText.trim();
        const service = this.services.find(s => s.name === draggedServiceName);

        if (service) {
          return {
            title: service.name,
            duration: { hours: Math.floor(service.duration), minutes: (service.duration % 1) * 60 },
            backgroundColor: this.serviceColors[service.id!],
            borderColor: this.serviceColors[service.id!],
            textColor: '#fff'
          };
        }
        return {};
      }
    });
  }


  handleEventDrop(info: any): void {
    const draggedServiceName = info.draggedEl.innerText.trim();
    const service = this.services.find(s => s.name === draggedServiceName);

    if (service) {
      const event = {
        title: service.name,
        start: info.date,
        end: new Date(info.date.getTime() + service.duration * 60 * 60 * 1000), // Set duration directly
        backgroundColor: window.getComputedStyle(info.draggedEl, null).getPropertyValue('background-color'),
        borderColor: window.getComputedStyle(info.draggedEl, null).getPropertyValue('background-color'),
        textColor: window.getComputedStyle(info.draggedEl, null).getPropertyValue('color')
      };
      // @ts-ignore
      this.calendarOptions.events = [...(this.calendarOptions.events || []), event];
    }

    const removeCheckbox = document.getElementById('drop-remove') as HTMLInputElement;
    if (removeCheckbox && removeCheckbox.checked) {
      info.draggedEl.parentNode!.removeChild(info.draggedEl);
    }
  }



  initializeDraggableEvents(): void {
    const externalEventsContainerEl = document.getElementById('external-events-list');
    if (externalEventsContainerEl) {
      new Draggable(externalEventsContainerEl, {
        itemSelector: '.fc-event',
        eventData: (eventEl: HTMLElement) => {
          const draggedServiceName = eventEl.innerText.trim();
          const service = this.services.find(s => s.name === draggedServiceName);

          if (service) {
            return {
              title: service.name,
              duration: { hours: Math.floor(service.duration), minutes: (service.duration % 1) * 60 },
              backgroundColor: this.serviceColors[service.id!],
              borderColor: this.serviceColors[service.id!],
              textColor: '#fff'
            };
          }
          return {};
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


  assignRandomColors(): void {
    this.services.forEach(service => {
      if (service.id !== undefined) {
        this.serviceColors[service.id] = this.getRandomColor();
      }
    });
  }


  getRandomColor(): string {
    const colorPalette: string[] = [
      'bg-success',
      'bg-warning',
      'bg-info',
      'bg-danger',
      'bg-primary'
    ];

    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
  }

  navigateToAddService(): void {
    this.router.navigate(['/add-new-service']);
  }
}
