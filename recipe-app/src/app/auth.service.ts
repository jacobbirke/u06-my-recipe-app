import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://u06-fullstack-recipe-app-jacobbirke.onrender.com/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Save the token
      })
    );
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, password_confirmation});
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }
}
