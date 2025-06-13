import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'originatorInitials',
})
export class OriginatorInitialsPipe implements PipeTransform {
  transform(name: string): string {
    if (!name) return '';

    const parts = name.split(' ');

    if (parts.length === 0) return '';

    const initials = parts
      .filter((part) => part.length > 0)
      .map((part) => part[0].toUpperCase())
      .join('');

    return initials;
  }
}
