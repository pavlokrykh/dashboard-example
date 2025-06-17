import { DecimalPipe } from '@angular/common';
import { booleanAttribute, Component, computed, input, OnInit, signal } from '@angular/core';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Component({
  selector: 'app-progress-bar',
  imports: [DecimalPipe],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  $target = input.required<number>({ alias: 'target' });
  $current = input.required<number>({ alias: 'current' });
  $targetLabel = input.required<string>({ alias: 'targetLabel' });
  $currentLabel = input<string | null>(null, { alias: 'currentLabel' });
  $statusColor = input<StatusColors>(StatusColors.Primary, { alias: 'statusColor' });
  $withPercentage = input(false, { alias: 'withPercentage', transform: booleanAttribute });
  $small = input(false, { alias: 'small', transform: booleanAttribute });
  $animationDuration = input(1000, { alias: 'animationDuration' }); // Animation duration in ms

  // Animation state
  $isAnimating = signal(false);
  $animatedPercentage = signal(0);

  // Calculate the target percentage of current value relative to target
  $targetPercentage = computed(() => {
    const target = this.$target();
    const current = this.$current();
    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  });

  // Use animated percentage during animation, otherwise use target percentage
  $percentage = computed(() => {
    return this.$isAnimating() ? this.$animatedPercentage() : this.$targetPercentage();
  });

  ngOnInit(): void {
    this.startAnimation();
  }

  private startAnimation(): void {
    const targetPercent = this.$targetPercentage();
    const duration = this.$animationDuration();
    
    if (targetPercent === 0) {
      return; // No animation needed if target is 0
    }

    this.$isAnimating.set(true);
    this.$animatedPercentage.set(0);

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutCubic for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentPercent = targetPercent * easeOutCubic;
      
      this.$animatedPercentage.set(currentPercent);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.$isAnimating.set(false);
      }
    };
    
    requestAnimationFrame(animate);
  }
}
