import { Component, input } from '@angular/core';
import { AccountStatusStep } from '@core/models/account/account-details.model';
import { StatusCircleComponent } from '@shared/components/status-circle/status-circle.component';

@Component({
  selector: 'app-account-status-progress',
  standalone: true,
  imports: [StatusCircleComponent],
  templateUrl: './account-status-progress.component.html',
  styleUrls: ['./account-status-progress.component.scss'],
})
export class AccountStatusProgressComponent {
  $steps = input.required<AccountStatusStep[]>({ alias: 'steps' });
}
