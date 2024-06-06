import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.awesome-markers';

@Component({
  selector: 'app-dorm-map',
  templateUrl: './dorm-map.component.html',
  styleUrls: ['./dorm-map.component.css']
})
export class DormMapComponent implements OnInit {

  public dorms = [
    { name: 'Camin P1', lat: 44.44432, lng: 26.05681 },
    { name: 'Camin P3', lat: 44.44451, lng: 26.05590 },
    { name: 'Camin P5', lat: 44.44473, lng: 26.05465 },
    { name: 'Camin P6', lat: 44.44512, lng: 26.05481 },
    { name: 'Camin P16', lat: 44.4467934450642, lng: 26.05156718316715 },
    { name: 'Camin P20', lat: 44.44575898713369, lng: 26.054408302213044 },
    { name: 'Camin P22', lat: 44.44525, lng: 26.05613 }
  ];

  private pinIcon = (L as any).AwesomeMarkers.icon({
    icon: 'map-marker-alt', // Font Awesome icon name without the "fa-" prefix
    prefix: 'fa', // Font Awesome prefix
    markerColor: 'blue' // Marker color (optional)
  });

  public selectedDorm: string = '';
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = L.map('map').setView([44.4458, 26.05474], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.clearMarkers();
    this.dorms.forEach(dorm => {
      if (this.selectedDorm === '' || this.selectedDorm === dorm.name) {
        const marker = L.marker([dorm.lat, dorm.lng], { icon: this.pinIcon }).addTo(this.map)
          .bindPopup(`<b>${dorm.name}</b>`);
        this.markers.push(marker);
      }
    });
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  public filterDorms(): void {
    this.addMarkers();
  }
}
