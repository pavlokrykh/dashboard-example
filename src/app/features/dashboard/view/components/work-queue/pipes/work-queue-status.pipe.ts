import { Pipe, PipeTransform } from '@angular/core';
import { WORK_QUEUE_STATUS_TRANSLATIONS, WorkQueueStatus } from '@core/models/dashboard/work-queue-item.model';

@Pipe({
  name: 'workQueueStatus',
  standalone: true,
})
export class WorkQueueStatusPipe implements PipeTransform {
  transform(status: WorkQueueStatus): string {
    return WORK_QUEUE_STATUS_TRANSLATIONS[status] || 'Unknown';
  }
}
