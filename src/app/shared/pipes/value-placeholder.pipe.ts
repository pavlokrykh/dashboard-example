import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuePlaceholder',
})
export class ValuePlaceholderPipe implements PipeTransform {
  transform(value: unknown, placeholder = 'N/A'): string {
    if (value === null || value === undefined || value === '') {
      return placeholder;
    }
    return String(value);
  }
}
