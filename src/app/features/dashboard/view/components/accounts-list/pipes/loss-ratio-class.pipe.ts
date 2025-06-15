import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lossRatioClass',
  standalone: true,
})
export class LossRatioClassPipe implements PipeTransform {
  transform(lossRatio: number): string {
    if (lossRatio <= 0.3) return 'status-success';
    if (lossRatio <= 0.5) return 'status-warning';
    return 'status-danger';
  }
}
