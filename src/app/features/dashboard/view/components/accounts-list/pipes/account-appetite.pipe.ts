import { Pipe, PipeTransform } from '@angular/core';
import { Appetite } from '@core/models/dashboard/accounts-list.model';

@Pipe({
  name: 'accountAppetite',
  standalone: true,
})
export class AccountAppetitePipe implements PipeTransform {
  transform(appetite: Appetite): string {
    switch (appetite) {
      case Appetite.High:
        return 'HIGH';
      case Appetite.Medium:
        return 'MEDIUM';
      case Appetite.Cautious:
        return 'CAUTIOUS';
      default:
        return 'Unknown';
    }
  }
}
