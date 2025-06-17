import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-dots-indicator',
  template: `
    <div class="dots-indicator">
      @for (dot of $dotArray(); track $index) {
        <span class="dot" [class.filled]="$index < $level()"></span>
      }
    </div>
  `,
  styles: `
    @use 'variables' as *;

    .dots-indicator {
      display: inline-flex;
      gap: 3px;
      align-items: center;

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba($primary-color, 0.3);
        flex-shrink: 0;

        &.filled {
          background: $primary-color;
        }
      }
    }
  `,
})
export class DotsIndicatorComponent {
  $level = input.required<number>({ alias: 'level' });
  $maxDots = input<number>(4, { alias: 'maxDots' });
  $dotArray = computed(() =>
    Array(this.$maxDots())
      .fill(0)
      .map((_, i) => i),
  );
}
