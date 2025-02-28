// Third party import
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// Local import
import { LoggedInUser, LoginToken, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  private readonly loggedInUserInfo: BehaviorSubject<LoggedInUser> =
    new BehaviorSubject(<LoggedInUser>{});

  constructor(private readonly http: HttpClient) {}

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<LoggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  createUser(user: User): Observable<any> {
    const url: string = 'http://localhost:5001/users/signup';
    return this.http.post<User>(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.http.post<User>(url, { email, password });
  }

  logout(): void {
    localStorage.clear();
    this.loggedInUserInfo.next(<LoggedInUser>{});
  }

  activateToken(token: LoginToken) {
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
  }
}
