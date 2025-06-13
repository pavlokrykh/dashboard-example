import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkQueueItem } from 'src/app/core/models/work-queue-item.model';

@Injectable({
  providedIn: 'root',
})
export class WorkQueueService {
  private readonly mockUrl = '/mock/mock-work-queue.json';
  private http = inject(HttpClient);

  getWorkQueue(): Observable<IWorkQueueItem[]> {
    return this.http.get<IWorkQueueItem[]>(this.mockUrl);
  }
}
