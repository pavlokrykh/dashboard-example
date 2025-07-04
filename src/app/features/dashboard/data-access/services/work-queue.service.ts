import { Injectable, inject } from '@angular/core';
import { IWorkQueueItem } from '@core/models/dashboard/work-queue-item.model';
import { WorkQueueStore } from '@shared/states/work-queue.store';
import { Observable, tap } from 'rxjs';
import { WorkQueueClient } from 'src/app/core/api/dashboard/work-queue.client';

@Injectable()
export class WorkQueueService {
  private readonly workQueueClient = inject(WorkQueueClient);
  private readonly workQueueStore = inject(WorkQueueStore);
  readonly $tasks = this.workQueueStore.tasks;
  readonly $filteredTasks = this.workQueueStore.filteredTasks;
  readonly $isLoading = this.workQueueStore.isLoading;

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

  searchTasks(searchValue: string): void {
    this.workQueueStore.updateSearchValue(searchValue);
  }
}
