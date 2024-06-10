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
    eventReceive: this.handleEventReceive.bind(this)
  };
  userId: number;
  services: Service[] = [];
  serviceColors: { [id: number]: string } = {};



  constructor(private router: Router, private serviceService: ServiceService) {
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? parseInt(userIdStr, 10) : 0;
  }

  ngOnInit(): void {
    this.loadServices();
    this.initializeDraggableEvents();
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

  initializeDraggableEvents(): void {
    const externalEventsContainerEl = document.getElementById('external-events-list');
    if (externalEventsContainerEl) {
      new Draggable(externalEventsContainerEl, {
        itemSelector: '.fc-event',
        eventData: (eventEl: HTMLElement) => {
          return {
            title: eventEl.innerText,
            duration: { hours: 1 },
            allDay: false,
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
