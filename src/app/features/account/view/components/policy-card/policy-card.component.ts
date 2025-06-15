import { Component, input } from '@angular/core';
import { Policy, PolicyType } from '@core/models/account/account-details.model';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  imports: [CurrencyFormatPipe],
  template: `
    <div class="policy-card">
      <div class="policy-type">{{ $policy().type }}</div>
      <div class="policy-premium">{{ $policy().premium | currencyFormat }}</div>
      @if ($policy().effDate) {
        <div class="policy-date">Eff Date: {{ $policy().effDate }}</div>
      } @else {
        <div class="policy-date no-date">----</div>
      }
    </div>
  `,
  styleUrls: ['./policy-card.component.scss'],
})
export class PolicyCardComponent {
  $policy = input.required<Policy>({ alias: 'policy' });
  readonly PolicyType = PolicyType;
}
