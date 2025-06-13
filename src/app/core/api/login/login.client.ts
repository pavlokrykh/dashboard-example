import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginClient {
  private http = inject(HttpClient);

  getUser(): Observable<IUser> {
    return this.http.get<IUser>('/mock/user.json');
  }
}
