import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@dvfu-delivery/types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
const LOCAL_STORAGE_USER_KEY = 'user_tovarish';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedUser) {
        this.currentUser$.next(JSON.parse(savedUser));
      }
    } catch ( e ) {
      console.error(e);
    }
  }

  getMe(): Observable<User> {
    if (this.currentUser$.value) {
      return of(this.currentUser$.value);
    }
    const userId = localStorage.getItem('id');
    return this.httpClient.post<User>(`${environment.serverBaseUrl}/users/me`, { userId }).pipe( tap(user => {
      this.currentUser$.next( user);
      localStorage.setItem('id', user.id + '');
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    }));
  }
}
