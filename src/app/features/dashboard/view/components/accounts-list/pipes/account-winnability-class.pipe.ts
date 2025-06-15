import { Pipe, PipeTransform } from '@angular/core';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { Winnability } from '@shared/enums/winnability.enum';

@Pipe({
  name: 'accountWinnabilityClass',
  standalone: true,
})
export class AccountWinnabilityClassPipe implements PipeTransform {
  transform(winnability: Winnability): StatusColors {
    switch (winnability) {
      case Winnability.NotLikely:
        return StatusColors.Danger;
      case Winnability.Medium:
        return StatusColors.Warning;
      case Winnability.Strong:
        return StatusColors.Primary;
      case Winnability.VeryStrong:
        return StatusColors.Success;
      default:
        return StatusColors.SecondaryDarker;
    }
  }
}
