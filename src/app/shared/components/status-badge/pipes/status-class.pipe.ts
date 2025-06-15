import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '@core/models/dashboard/accounts-list.model';
import { WorkQueueStatus } from '@core/models/dashboard/work-queue-item.model';

export type StatusInput = Status | WorkQueueStatus | number;

@Pipe({
  name: 'statusClass',
  standalone: true,
})
export class StatusClassPipe implements PipeTransform {
  transform(status: StatusInput): string {
    // Handle accounts list status
    if (status === Status.Active || status === 1) {
      return 'status-completed';
    }
    if (status === Status.Review || status === 2) {
      return 'status-pending';
    }

    // Handle work queue status
    if (status === WorkQueueStatus.New) {
      return 'status-new';
    }
    if (status === WorkQueueStatus.Pending) {
      return 'status-pending';
    }
    if (status === WorkQueueStatus.Completed || status === 3) {
      return 'status-completed';
    }

    return '';
  }
}
