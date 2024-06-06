import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMenu: boolean = true;
  private userSubscription: Subscription | undefined;
  userName: string | undefined;
  userId: string | null | undefined
  imageError = false;  // Add this property


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !['/', '/register', '/login'].includes(event.urlAfterRedirects);
      }
    });

    this.userId = localStorage.getItem('userId'); // Get userId from local storage
    if (this.userId) {
      this.userSubscription = this.userService.getUser(Number(this.userId))
        .subscribe(
          user => {
            this.userName = user.firstName + " " + user.lastName; // Assuming 'name' is the property that stores the user's name
          },
          error => {
            console.error('Error fetching user name:', error);
          }
        );
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the user subscription to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getUserInitials(username: string | undefined): string {  // Change the parameter type to handle undefined
    if (!username) return '';
    const nameParts = username.split(' ');
    const firstNameInitial = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : '';
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';

    return `${firstNameInitial}${lastNameInitial}`;
  }
}
