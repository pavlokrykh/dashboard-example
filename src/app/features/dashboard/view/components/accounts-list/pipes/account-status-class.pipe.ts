import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '@core/models/dashboard/accounts-list.model';

@Pipe({
  name: 'accountStatusClass',
  standalone: true,
})
export class AccountStatusClassPipe implements PipeTransform {
  transform(status: Status): string {
    switch (status) {
      case Status.Active:
        return 'status-completed';
      case Status.Review:
        return 'status-pending';
      default:
        return '';
    }
  }
}
