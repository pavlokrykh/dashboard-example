import { Component, input } from '@angular/core';
import { StatusCircleComponent } from '@shared/components/status-circle/status-circle.component';

export interface StepperStep {
  label: string;
  completed: boolean;
}

@Component({
  selector: 'app-progress-stepper',
  imports: [StatusCircleComponent],
  templateUrl: './progress-stepper.component.html',
  styleUrls: ['./progress-stepper.component.scss'],
})
export class ProgressStepperComponent {
  $steps = input.required<StepperStep[]>({ alias: 'steps' });
}
