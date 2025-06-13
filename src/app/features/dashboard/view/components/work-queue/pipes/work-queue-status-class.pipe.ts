import { Pipe, PipeTransform } from '@angular/core';
import { WorkQueueStatus } from '@core/models/work-queue-item.model';

export enum TaskStatusClass {
  New = 'status-new',
  Pending = 'status-pending',
  Completed = 'status-completed',
}

@Pipe({
  name: 'workQueueStatusClass',
  standalone: true,
})
export class WorkQueueStatusClassPipe implements PipeTransform {
  transform(status: WorkQueueStatus): string {
    switch (status) {
      case WorkQueueStatus.New:
        return TaskStatusClass.New;
      case WorkQueueStatus.Pending:
        return TaskStatusClass.Pending;
      case WorkQueueStatus.Completed:
        return TaskStatusClass.Completed;
      default:
        return '';
    }
  }
}
