import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { WinnabilityDetails } from '@core/models/account/account-details.model';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { WinnabilityClassPipe } from '@shared/pipes/winnability-class.pipe';
import { WinnabilityStatusPipe } from '@shared/pipes/winnability-status.pipe';

@Component({
  selector: 'app-winnability-details',
  imports: [CommonModule, StatusBadgeComponent, ProgressBarComponent, WinnabilityStatusPipe, WinnabilityClassPipe],
  templateUrl: './winnability-details.component.html',
  styleUrls: ['./winnability-details.component.scss'],
})
export class WinnabilityDetailsComponent {
  $winnabilityDetails = input.required<WinnabilityDetails>({ alias: 'winnabilityDetails' });

  Math = Math;
  StatusColors = StatusColors;
}
