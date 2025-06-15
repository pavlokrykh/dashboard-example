import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '@core/models/dashboard/accounts-list.model';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'accountStatusClass',
  standalone: true,
})
export class AccountStatusClassPipe implements PipeTransform {
  transform(status: Status): StatusColors | '' {
    switch (status) {
      case Status.Active:
        return StatusColors.Success;
      case Status.Review:
        return StatusColors.Warning;
      default:
        return '';
    }
  }
}
