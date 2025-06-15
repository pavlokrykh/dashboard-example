import { Component, input } from '@angular/core';
import { AccountStatusStep, StatusStep } from '@core/models/account/account-details.model';

@Component({
  selector: 'app-account-status-progress',
  standalone: true,
  templateUrl: './account-status-progress.component.html',
  styleUrls: ['./account-status-progress.component.scss'],
})
export class AccountStatusProgressComponent {
  $steps = input.required<AccountStatusStep[]>({ alias: 'steps' });
  readonly StatusStep = StatusStep;

  isCurrentStep(index: number): boolean {
    const steps = this.$steps();
    return index === steps.findIndex((step) => !step.completed);
  }
}
