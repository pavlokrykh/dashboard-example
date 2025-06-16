import { Component, input, output } from '@angular/core';
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
      margin-left: 1rem;
      height: 40px;
      width: 480px;
      font-size: 0.9rem;

      &:focus {
        border: 1px solid $border-color !important;
        outline: none;
      }

      &::placeholder {
        color: $search-placeholder-text;
      }
    }
  `,
})
export class SearchComponent {
  $placeholder = input<string>('', { alias: 'placeholder' });
  $width = input<number>(480, { alias: 'width' });

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
