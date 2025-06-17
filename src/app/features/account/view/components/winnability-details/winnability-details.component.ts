import { AiRecommendationsComponent } from '@account/view/components/ai-recommendations/ai-recommendations.component';
import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { WinnabilityDetails } from '@core/models/account/account-details.model';
import { ChartDataPoint, LineChartComponent } from '@shared/components/line-chart/line-chart.component';
import { ProgressBarComponent } from '@shared/components/progress-bar/progress-bar.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { StatusColors } from '@shared/enums/status-colors.enum';
import { WinnabilityClassPipe } from '@shared/pipes/winnability-class.pipe';
import { WinnabilityStatusPipe } from '@shared/pipes/winnability-status.pipe';

@Component({
  selector: 'app-winnability-details',
  imports: [
    CommonModule,
    StatusBadgeComponent,
    ProgressBarComponent,
    LineChartComponent,
    WinnabilityStatusPipe,
    WinnabilityClassPipe,
    AiRecommendationsComponent,
  ],
  templateUrl: './winnability-details.component.html',
  styleUrls: ['./winnability-details.component.scss'],
})
export class WinnabilityDetailsComponent {
  $winnabilityDetails = input.required<WinnabilityDetails>({ alias: 'winnabilityDetails' });

  // Convert historical trend data to chart format
  historicalTrendData = computed<ChartDataPoint[]>(() => {
    return this.$winnabilityDetails().historicalTrend.map(trend => ({
      label: trend.month,
      value: trend.value
    }));
  });

  // Chart configuration for historical trend
  chartConfig = {
    width: 280,
    height: 100,
    strokeColor: '#3B82F6',
    strokeWidth: 2,
    pointColor: '#3B82F6',
    pointRadius: 3,
    showPoints: true,
    showGrid: false,
    labelColor: '#6B7280',
    valueColor: '#6B7280'
  };

  Math = Math;
  StatusColors = StatusColors;
}
