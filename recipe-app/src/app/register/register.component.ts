import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Ensure Router is imported

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router  // Ensure Router is injected here
  ) {}

  register() {
    if (this.password !== this.password_confirmation) {
      this.error = 'Lösenorden matchar inte.';
      return;
    }

    this.authService.register(this.name, this.email, this.password, this.password_confirmation).subscribe(
      response => {
        this.router.navigate(['/suggestions']); 
      },
      error => {
        this.error = error.error.message; 
      }
    );
  }
}
