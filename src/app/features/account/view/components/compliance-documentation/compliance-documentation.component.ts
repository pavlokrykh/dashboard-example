import { Component, input } from '@angular/core';
import { ComplianceDocumentationItem } from '@core/models/account/account-details.model';
import { StatusCircleComponent } from '@shared/components/status-circle/status-circle.component';

@Component({
  selector: 'app-compliance-documentation',
  standalone: true,
  imports: [StatusCircleComponent],
  templateUrl: './compliance-documentation.component.html',
  styleUrls: ['./compliance-documentation.component.scss'],
})
export class ComplianceDocumentationComponent {
  $items = input.required<ComplianceDocumentationItem[]>({ alias: 'items' });
}
