import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe(
      response => {
        // Logga ut lyckad
        this.router.navigate(['/suggestions']);
      },
      error => {
        // Hantera eventuella fel här
        console.error('Logout error:', error);
      }
    );
  }
}
