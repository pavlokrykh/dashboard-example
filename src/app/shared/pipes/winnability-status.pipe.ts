import { Pipe, PipeTransform } from '@angular/core';
import { Winnability } from '@shared/enums/winnability.enum';

@Pipe({
  name: 'winnabilityStatus',
})
export class WinnabilityStatusPipe implements PipeTransform {
  transform(value: Winnability | undefined): string {
    if (!value) return 'Unknown';

    switch (value) {
      case Winnability.VeryStrong:
        return 'Very Strong';
      case Winnability.Strong:
        return 'Strong';
      case Winnability.Medium:
        return 'Medium';
      case Winnability.NotLikely:
        return 'Not Likely';
      default:
        return 'Unknown';
    }
  }
}
