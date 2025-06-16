import { Pipe, PipeTransform } from '@angular/core';
import { CommunicationStatus } from '@core/models/account/communication.model';

@Pipe({
  name: 'communicationStatusText',
})
export class CommunicationStatusTextPipe implements PipeTransform {
  transform(status: CommunicationStatus): string {
    switch (status) {
      case CommunicationStatus.New:
        return 'NEW';
      case CommunicationStatus.Responded:
        return 'Responded';
      default:
        return 'Regular';
    }
  }
}
