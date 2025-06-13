import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '@core/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginClient {
  private http = inject(HttpClient);

  getUser(): Observable<IUser> {
    return this.http.get<IUser>('/mock/user.json');
  }
}
