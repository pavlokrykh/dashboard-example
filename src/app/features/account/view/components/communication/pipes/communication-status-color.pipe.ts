import { Pipe, PipeTransform } from '@angular/core';
import { CommunicationStatus } from '@core/models/account/communication.model';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'communicationStatusColor',
})
export class CommunicationStatusColorPipe implements PipeTransform {
  transform(status: CommunicationStatus): StatusColors {
    switch (status) {
      case CommunicationStatus.New:
        return StatusColors.Primary;
      case CommunicationStatus.Responded:
        return StatusColors.SecondaryDarker;
      default:
        return StatusColors.SecondaryDarker; // This won't be used since Regular doesn't show badge
    }
  }
}
