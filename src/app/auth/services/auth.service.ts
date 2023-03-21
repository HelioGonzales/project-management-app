import { SockectService } from './../../shared/services/sockect.service';
import { RegisterRequestInterface } from './../types/regiter-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CurrentUserInterface } from '../types/current-user';
import { LoginRequestInterface } from '../types/login-request-interface';

@Injectable()
export class AuthService {
  currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(
    undefined
  );

  isLogged$ = this.currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(Boolean)
  );

  constructor(private http: HttpClient, private sockectSvc: SockectService) {}

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http.get<CurrentUserInterface>(url);
  }

  getUser(user: string): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/' + user;
    return this.http.get<CurrentUserInterface>(url);
  }

  register(
    registerRequest: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/signup';
    return this.http.post<CurrentUserInterface>(url, registerRequest);
  }

  login(loginRequest: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/signin';
    return this.http.post<CurrentUserInterface>(url, loginRequest);
  }

  setToken(currentUser: CurrentUserInterface): void {
    localStorage.setItem('token', currentUser.token);
  }

  setCurrentUser(currentUser: CurrentUserInterface | null): void {
    this.currentUser$.next(currentUser);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
    this.sockectSvc.disconnect();
  }
}
