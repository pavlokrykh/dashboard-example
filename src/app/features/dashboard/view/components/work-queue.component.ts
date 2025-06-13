import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WorkQueueService } from '@dashboard/data-access/services/work-queue.service';
import { WorkQueueStore } from '@dashboard/data-access/state/work-queue.store';

@Component({
  selector: 'app-work-queue-component',
  imports: [],
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss'],
  providers: [WorkQueueService],
})
export class WorkQueueComponent {
  private readonly workQueueService = inject(WorkQueueService);
  private readonly workQueueStore = inject(WorkQueueStore);

  readonly $tasks = this.workQueueStore.tasks;

  constructor() {
    this.workQueueService.getWorkQueue().pipe(takeUntilDestroyed()).subscribe();
  }
}
