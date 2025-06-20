import { booleanAttribute, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  template: `
    <input
      class="search-input"
      type="text"
      [class.outlined]="$outline()"
      [class.search-small]="$small()"
      [style.width.px]="$width()"
      [placeholder]="$placeholder()"
      (input)="onSearchChange($event)"
    />
  `,
  styles: `
    @use 'variables' as *;

    .search-input {
      background-color: $card-bg;
      color: $text-primary;
      border: 1px solid $card-bg;
      border-radius: 20px;
      padding: 0.5rem 1rem;
      height: 40px;
      width: 480px;
      font-size: 0.9rem;

      &:focus {
        border: 1px solid $border-color !important;
        outline: none;
      }

      &.outlined {
        border: 1px solid $border-color;
      }

      &::placeholder {
        color: $search-placeholder-text;
      }
    }

    .search-small {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      height: 28px;
    }
  `,
})
export class SearchComponent {
  $placeholder = input<string>('', { alias: 'placeholder' });
  $width = input<number>(480, { alias: 'width' });
  $outline = input(false, { alias: 'outline', transform: booleanAttribute });
  $small = input(false, { alias: 'small', transform: booleanAttribute });

  searchValue = output<string>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      this.searchValue.emit(value);
    });
  }

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }
}
