import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  register() {
    if (this.password !== this.passwordConfirmation) {
      this.error = 'Lösenorden matchar inte.';
      return;
    }

    this.authService.register(this.name, this.email, this.password).subscribe(
      response => {
      },
      error => {
        this.error = error.error.message; 
      }
    );
  }
}
