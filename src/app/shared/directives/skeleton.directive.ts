import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingSkeletonComponent } from '@shared/components/loading-skeleton/loading-skeleton.component';

@Directive({
  selector: '[appSkeleton]',
})
export class SkeletonDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  $isLoading = input.required<boolean>({ alias: 'appSkeleton' });

  constructor() {
    effect(() => {
      this.viewContainer.clear();

      if (this.$isLoading()) {
        this.viewContainer.createComponent(LoadingSkeletonComponent);
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
