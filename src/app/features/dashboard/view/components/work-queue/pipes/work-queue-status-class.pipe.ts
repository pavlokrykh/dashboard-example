import { Pipe, PipeTransform } from '@angular/core';
import { WorkQueueStatus } from '@core/models/dashboard/work-queue-item.model';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'workQueueStatusClass',
  standalone: true,
})
export class WorkQueueStatusClassPipe implements PipeTransform {
  transform(status: WorkQueueStatus): string {
    switch (status) {
      case WorkQueueStatus.New:
        return StatusColors.Primary;
      case WorkQueueStatus.Pending:
        return StatusColors.Warning;
      case WorkQueueStatus.Completed:
        return StatusColors.Success;
      default:
        return '';
    }
  }
}
