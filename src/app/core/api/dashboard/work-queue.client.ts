import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IWorkQueueItem } from '@core/models/work-queue-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkQueueClient {
  private readonly mockUrl = '/mock/mock-work-queue.json';
  private http = inject(HttpClient);

  getWorkQueue(): Observable<IWorkQueueItem[]> {
    return this.http.get<IWorkQueueItem[]>(this.mockUrl);
  }
}
