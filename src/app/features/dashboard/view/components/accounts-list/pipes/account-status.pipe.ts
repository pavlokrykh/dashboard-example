import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '@core/models/dashboard/accounts-list.model';

@Pipe({
  name: 'accountStatus',
  standalone: true,
})
export class AccountStatusPipe implements PipeTransform {
  transform(status: Status): string {
    switch (status) {
      case Status.Active:
        return 'Active';
      case Status.Review:
        return 'Under review';
      default:
        return 'Unknown';
    }
  }
}
