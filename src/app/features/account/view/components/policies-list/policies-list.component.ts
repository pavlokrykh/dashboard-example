import { Component, input } from '@angular/core';
import { Policy } from '@core/models/account/account-details.model';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-policies-list',
  imports: [CurrencyFormatPipe],
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss'],
})
export class PoliciesListComponent {
  $policies = input.required<Policy[]>({ alias: 'policies' });
}
