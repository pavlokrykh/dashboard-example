import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '$0';
    }

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue < 1000) {
      return `${sign}$${absValue.toFixed(0)}`;
    } else if (absValue < 1000000) {
      const thousands = absValue / 1000;
      return `${sign}$${thousands.toFixed(1)}K`;
    } else if (absValue < 1000000000) {
      const millions = absValue / 1000000;
      return `${sign}$${millions.toFixed(1)}M`;
    } else {
      const billions = absValue / 1000000000;
      return `${sign}$${billions.toFixed(1)}B`;
    }
  }
}
