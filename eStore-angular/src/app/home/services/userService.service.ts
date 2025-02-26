// Third party import
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Local import
import { LoginToken, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.http.post<User>(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.http.post<User>(url, { email, password });
  }

  activateToken(token: LoginToken) {
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
  }
}
