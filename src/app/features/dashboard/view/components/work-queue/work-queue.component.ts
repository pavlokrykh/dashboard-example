import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskType, WorkQueueStatus } from '@core/models/dashboard/work-queue-item.model';
import { WorkQueueService } from '@dashboard/data-access/services/work-queue.service';
import { ProfileCircleComponent } from '@shared/components/profile-circle/profile-circle.component';
import { useRouteFragment } from '@shared/utils/route-fragment.util';
import { WorkQueueStatusClassPipe } from './pipes/work-queue-status-class.pipe';
import { WorkQueueStatusPipe } from './pipes/work-queue-status.pipe';

export enum WorkQueueTab {
  Assigned = 'assigned',
  Pending = 'pending',
  Referrals = 'referrals',
}

@Component({
  selector: 'app-work-queue',
  imports: [ProfileCircleComponent, NgClass, WorkQueueStatusPipe, WorkQueueStatusClassPipe],
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss'],
  providers: [WorkQueueService],
})
export class WorkQueueComponent {
  private readonly workQueueService = inject(WorkQueueService);

  // Use the route fragment utility
  private readonly routeFragment = useRouteFragment<WorkQueueTab>({
    defaultValue: WorkQueueTab.Assigned,
    fragmentMapper: (fragment) => this.getTabFromFragment(fragment),
  });
  readonly $activeTab = this.routeFragment.$fragment;
  readonly $tasks = this.workQueueService.$filteredTasks;

  readonly $pendingTasks = computed(() => this.$tasks().filter((task) => task.status === WorkQueueStatus.Pending));
  readonly $referralTasks = computed(() => this.$tasks().filter((task) => task.type === TaskType.Underwriter));
  readonly $filteredTasks = computed(() => {
    switch (this.$activeTab()) {
      case WorkQueueTab.Pending:
        return this.$pendingTasks();
      case WorkQueueTab.Referrals:
        return this.$referralTasks();
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
