import { Pipe, PipeTransform } from '@angular/core';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'lossRatioClass',
})
export class LossRatioClassPipe implements PipeTransform {
  transform(lossRatio: number): StatusColors {
    if (lossRatio <= 0.35) return StatusColors.Success;
    if (lossRatio <= 0.5) return StatusColors.Warning;
    return StatusColors.Danger;
  }
}
