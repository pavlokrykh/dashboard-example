import { Pipe, PipeTransform } from '@angular/core';
import { Winnability } from '@core/models/dashboard/accounts-list.model';

@Pipe({
  name: 'accountWinnabilityClass',
  standalone: true,
})
export class AccountWinnabilityClassPipe implements PipeTransform {
  transform(winnability: Winnability): string {
    switch (winnability) {
      case Winnability.NotLikely:
        return 'winnability-not-likely';
      case Winnability.Medium:
        return 'winnability-medium';
      case Winnability.Strong:
        return 'winnability-strong';
      case Winnability.VeryStrong:
        return 'winnability-very-strong';
      default:
        return '';
    }
  }
}
