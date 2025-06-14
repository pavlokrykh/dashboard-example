import { Pipe, PipeTransform } from '@angular/core';
import { Winnability } from '@core/models/dashboard/accounts-list.model';

@Pipe({
  name: 'accountWinnability',
  standalone: true,
})
export class AccountWinnabilityPipe implements PipeTransform {
  transform(winnability: Winnability): string {
    switch (winnability) {
      case Winnability.NotLikely:
        return 'Not Likely';
      case Winnability.Medium:
        return 'Medium';
      case Winnability.Strong:
        return 'Strong';
      case Winnability.VeryStrong:
        return 'Very Strong';
      default:
        return 'Unknown';
    }
  }
}
