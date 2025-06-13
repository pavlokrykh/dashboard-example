import { Injectable, inject } from '@angular/core';
import { WorkQueueStore } from '@dashboard/data-access/state/work-queue.store';
import { Observable, tap } from 'rxjs';
import { WorkQueueClient } from 'src/app/core/api/dashboard/work-queue.client';
import { IWorkQueueItem } from 'src/app/core/models/work-queue-item.model';

@Injectable()
export class WorkQueueService {
  private readonly workQueueClient = inject(WorkQueueClient);
  private readonly workQueueStore = inject(WorkQueueStore);

  getWorkQueue(): Observable<IWorkQueueItem[]> {
    this.workQueueStore.setLoading(true);
    return this.workQueueClient.getWorkQueue().pipe(
      tap((data) => {
        console.log('Work Queue Data:', data);
        this.workQueueStore.updateTasks(data);
        this.workQueueStore.setLoading(false);
      }),
    );
  }
}
