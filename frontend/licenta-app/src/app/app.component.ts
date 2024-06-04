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
}
