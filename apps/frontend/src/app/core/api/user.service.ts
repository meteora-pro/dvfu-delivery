import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@dvfu-delivery/types';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser?: User;

  constructor(private httpClient: HttpClient) {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    } catch ( e ) {
      console.error(e);
    }
  }

  getMe(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    }
    const userId = localStorage.getItem('id');
    return this.httpClient.post<User>(`${environment.serverBaseUrl}/user/me`, { userId }).pipe( tap(user => {
      this.currentUser = user;
      localStorage.setItem('id', user.id + '');
      localStorage.setItem('id', JSON.stringify(user));
    }));
  }
}
