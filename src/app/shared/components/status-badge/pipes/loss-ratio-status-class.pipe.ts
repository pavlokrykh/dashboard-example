import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lossRatioStatusClass',
  standalone: true,
})
export class LossRatioStatusClassPipe implements PipeTransform {
  transform(lossRatio: number): string {
    if (lossRatio <= 0.3) return 'status-success';
    if (lossRatio <= 0.5) return 'status-warning';
    return 'status-danger';
  }
}
