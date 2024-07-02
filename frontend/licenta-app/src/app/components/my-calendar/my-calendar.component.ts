import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  // Add AfterViewInit
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import FullCalendarComponent from @fullcalendar/angular
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {Appointment} from "../../models/appointment";
import {Service} from "../../models/service";
import {ServiceService} from "../../services/service.service";

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit {
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
  };
  userId: number;
  services: Service[] = [];
  serviceColors: { [id: number]: string } = {};
  appointments: Appointment[] = [];
  serviceId: number;


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

    };
  }



  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private appointmentService: AppointmentService) {
    const userIdStr = localStorage.getItem('userId');
    this.userId = userIdStr ? parseInt(userIdStr, 10) : 0;
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));

    this.loadAppointment();
    this.initDraggableEvents();
    this.initCalendar();

  }

  loadAppointment(): void {
    this.appointmentService.getAppointmentsByUser(this.userId).subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.initializeCalendarEvents();
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
            textColor: '#fff',
            serviceId: service.id,
            ownerId: Number(localStorage.getItem('userId'))
          };
        }
        return {};
      }
    });
  }

  initializeCalendarEvents(): void {
    this.calendarOptions.events = this.appointments.map(appointment => {
      const serviceId = appointment.service?.id;
      return {
        title: appointment.service.name,
        start: appointment.startTime,
        end: appointment.endTime,
        backgroundColor: serviceId ? this.serviceColors[serviceId] : '#000000', // Default to black if undefined
        borderColor: serviceId ? this.serviceColors[serviceId] : '#000000'
      };
    });
  }


}
