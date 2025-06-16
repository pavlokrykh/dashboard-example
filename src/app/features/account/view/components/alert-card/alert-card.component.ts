import { Component, input } from '@angular/core';
import { AccountDetailsAlert, AlertType } from '@core/models/account/account-details.model';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss'],
})
export class AlertCardComponent {
  $alerts = input<AccountDetailsAlert[]>([], { alias: 'alerts' });

  // Expose enum for template usage
  AlertType = AlertType;
}
