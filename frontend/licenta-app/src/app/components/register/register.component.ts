import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';
  agreeTerms: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.agreeTerms) {
      alert('You must agree to the terms');
      return;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
    };

    this.http.post('http://localhost:8080/api/users/register', user).subscribe(
      (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
      },
      (error) => {
        console.error('Error registering user', error);
        alert('Error registering user: ' + error.error.message);
      }
    );
  }
}
