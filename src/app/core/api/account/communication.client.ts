import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Communication } from '@core/models/account/communication.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationClient {
  private readonly mockUrl = '/mock/communication.json';
  private readonly http = inject(HttpClient);

  getCommunications$(): Observable<Communication[]> {
    return this.http.get<Communication[]>(this.mockUrl);
  }
}
