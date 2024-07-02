import { ActivatedRoute } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import { AppointmentService } from 'src/app/services/appointment.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';  // Add AfterViewInit
import {CalendarOptions, EventClickArg, EventInput} from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // Import FullCalendarComponent from @fullcalendar/angular
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {Appointment} from "../../../models/appointment";
import {Service} from "../../../models/service";
import {ServiceService} from "../../../services/service.service";
import {MatDialog} from "@angular/material/dialog";
import {BookServicePopupComponent} from "../book-service-popup/book-service-popup.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css']
})
export class BookServiceComponent implements OnInit {
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
    eventClick: (info) => {
      console.log("aaaaaaaaaaaaaaaa");
      console.log(info);
      this.openBookServicePopup(Number(info.event.id));
    }

  };
  userId: number;
  services: Service[] = [];
  serviceColors: { [id: number]: string } = {};
  appointments: Appointment[] = [];
  serviceId: number;



  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private appointmentService: AppointmentService, public dialog: MatDialog, private snackBar: MatSnackBar) {
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
      eventClick: (info) => {
        console.log("aaaaaaaaaaaaaaaa");

        console.log(Number(info.event));
        this.openBookServicePopup(Number(info.event.id));
      }


    };
  }


  loadAppointment(): void {
    this.appointmentService.getAppointmentsByService(this.serviceId).subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments.filter(appointment => appointment.status === 'AVAILABLE');
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
    // @ts-ignore
    this.calendarOptions.events = this.appointments.map(appointment => {
      const serviceId = appointment.service?.id;
      return {
        id: appointment.id,
        title: appointment.service.name,
        start: appointment.startTime,
        end: appointment.endTime,
        backgroundColor: serviceId ? this.serviceColors[serviceId] : '#000000', // Default to black if undefined
        borderColor: serviceId ? this.serviceColors[serviceId] : '#000000'
      };
    });
  }


  openBookServicePopup(appointmentId: number): void {
    const dialogRef = this.dialog.open(BookServicePopupComponent, {
      width: '300px',
      data: { appointmentId: appointmentId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment booked successfully');
        this.snackBar.open('Appointment booked successfully', 'Close', {
          duration: 2000, // Duration in milliseconds
          verticalPosition: 'bottom', // Position of the snackbar
          horizontalPosition: 'center' // Position of the snackbar
        });
        // Refresh the calendar or handle the booking confirmation
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      }

    });
  }


}
