import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.http.post<{ id: number }>('http://localhost:8080/api/users/login', user).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('userId', response.id.toString());
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
      },
      (error) => {
        console.error('Error logging in', error);
        alert('Invalid credentials');
      }
    );
  }
}
