import { Component, computed, input } from '@angular/core';
import { AccountStatusStep } from '@core/models/account/account-details.model';
import { ProgressStepperComponent, StepperStep } from '@shared/components/progress-stepper/progress-stepper.component';

@Component({
  selector: 'app-account-status-progress',
  standalone: true,
  imports: [ProgressStepperComponent],
  templateUrl: './account-status-progress.component.html',
  styleUrls: ['./account-status-progress.component.scss'],
})
export class AccountStatusProgressComponent {
  $steps = input.required<AccountStatusStep[]>({ alias: 'steps' });
  $stepperSteps = computed<StepperStep[]>(() =>
    this.$steps().map((step) => ({
      label: step.step,
      completed: step.completed,
    })),
  );
}
