import { Pipe, PipeTransform } from '@angular/core';
import { WorkQueueStatus } from '@core/models/work-queue-item.model';

@Pipe({
  name: 'workQueueStatusClass',
  standalone: true,
})
export class WorkQueueStatusClassPipe implements PipeTransform {
  transform(status: WorkQueueStatus): string {
    switch (status) {
      case WorkQueueStatus.New:
        return 'status-new';
      case WorkQueueStatus.Pending:
        return 'status-pending';
      case WorkQueueStatus.Completed:
        return 'status-completed';
      default:
        return '';
    }
  }
}
