import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskType, WorkQueueStatus } from '@core/models/work-queue-item.model';
import { WorkQueueService } from '@dashboard/data-access/services/work-queue.service';
import { WorkQueueStore } from '@dashboard/data-access/state/work-queue.store';
import { useRouteFragment } from '@shared/utils/route-fragment.util';
import { OriginatorInitialsPipe } from './pipes/originator-initials.pipe';
import { WorkQueueStatusClassPipe } from './pipes/work-queue-status-class.pipe';
import { WorkQueueStatusPipe } from './pipes/work-queue-status.pipe';

export enum WorkQueueTab {
  Assigned = 'assigned',
  Pending = 'pending',
  Referrals = 'referrals',
}

@Component({
  selector: 'app-work-queue',
  imports: [WorkQueueStatusPipe, WorkQueueStatusClassPipe, NgClass, OriginatorInitialsPipe],
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss'],
  providers: [WorkQueueService],
})
export class WorkQueueComponent {
  private readonly workQueueService = inject(WorkQueueService);
  private readonly workQueueStore = inject(WorkQueueStore);

  // Use the route fragment utility
  private readonly routeFragment = useRouteFragment<WorkQueueTab>({
    defaultValue: WorkQueueTab.Assigned,
    fragmentMapper: (fragment) => this.getTabFromFragment(fragment),
  });
  readonly $activeTab = this.routeFragment.$fragment;
  readonly $tasks = this.workQueueStore.tasks;

  readonly $filteredTasks = computed(() => {
    switch (this.$activeTab()) {
      case WorkQueueTab.Pending:
        return this.$tasks().filter((task) => task.status === WorkQueueStatus.Pending);
      case WorkQueueTab.Referrals:
        return this.$tasks().filter((task) => task.type === TaskType.Underwriter);
      case WorkQueueTab.Assigned:
      default:
        return this.$tasks();
    }
  });

  readonly WorkQueueTab = WorkQueueTab; // Expose enum to template

  constructor() {
    this.workQueueService.getWorkQueue().pipe(takeUntilDestroyed()).subscribe();
  }

  setActiveTab(tab: WorkQueueTab) {
    this.routeFragment.setFragment(tab);
  }

  private getTabFromFragment(fragment: string | null): WorkQueueTab {
    switch (fragment) {
      case WorkQueueTab.Pending:
        return WorkQueueTab.Pending;
      case WorkQueueTab.Referrals:
        return WorkQueueTab.Referrals;
      default:
        return WorkQueueTab.Assigned;
    }
  }
}
