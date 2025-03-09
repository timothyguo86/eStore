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
  private autoLogoutTimer: any;
  private authToken!: string;
  private readonly isAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  private readonly loggedInUserInfo: BehaviorSubject<LoggedInUser> =
    new BehaviorSubject(<LoggedInUser>{});

  constructor(private readonly http: HttpClient) {
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<LoggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  get token(): string {
    return this.authToken;
  }

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
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString(),
    );
    localStorage.setItem('firstName', token.user.firstName);
    localStorage.setItem('lastName', token.user.lastName);
    localStorage.setItem('address', token.user.address);
    localStorage.setItem('city', token.user.city);
    localStorage.setItem('state', token.user.state);
    localStorage.setItem('pin', token.user.pin);
    localStorage.setItem('email', token.user.email);

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this.authToken = token.token;
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<LoggedInUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  loadToken(): void {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');

    if (token && expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);
      if (now < expiryDate) {
        const firstName = localStorage.getItem('firstName') ?? '';
        const lastName = localStorage.getItem('lastName') ?? '';
        const address = localStorage.getItem('address') ?? '';
        const city = localStorage.getItem('city') ?? '';
        const state = localStorage.getItem('state') ?? '';
        const pin = localStorage.getItem('pin') ?? '';
        const email = localStorage.getItem('email') ?? '';

        const user: LoggedInUser = {
          firstName,
          lastName,
          address,
          city,
          state,
          pin,
          email,
        };

        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer((expiryDate.getTime() - now.getTime()) / 1000);

        this.authToken = token;
      } else this.logout();
    }
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
}
