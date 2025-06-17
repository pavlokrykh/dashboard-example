import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  pointColor?: string;
  pointRadius?: number;
  showPoints?: boolean;
  showGrid?: boolean;
  gridColor?: string;
  labelColor?: string;
  valueColor?: string;
  animationDuration?: number;
}

@Component({
  selector: 'app-line-chart',
  imports: [CommonModule],
  template: `
    <div class="line-chart-container" [style.width.px]="config().width" [style.height.px]="config().height">
      <svg 
        [attr.width]="config().width" 
        [attr.height]="config().height" 
        class="line-chart-svg"
        [attr.viewBox]="'0 0 ' + config().width + ' ' + config().height">
        
        <!-- Grid lines -->
        @if (config().showGrid) {
          <defs>
            <pattern id="grid" [attr.width]="gridSpacing().x" [attr.height]="gridSpacing().y" patternUnits="userSpaceOnUse">
              <path 
                [attr.d]="'M ' + gridSpacing().x + ' 0 L 0 0 0 ' + gridSpacing().y" 
                fill="none" 
                [attr.stroke]="config().gridColor" 
                stroke-width="0.5" 
                opacity="0.3"/>
            </pattern>
          </defs>
          <rect 
            [attr.x]="padding().left" 
            [attr.y]="padding().top" 
            [attr.width]="chartDimensions().width" 
            [attr.height]="chartDimensions().height" 
            fill="url(#grid)"/>
        }
        
        <!-- Chart line -->
        <path 
          [attr.d]="linePath()" 
          fill="none" 
          [attr.stroke]="config().strokeColor" 
          [attr.stroke-width]="config().strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="chart-line"/>
        
        <!-- Data points -->
        @if (config().showPoints) {
          @for (point of chartPoints(); track point.x) {
            <circle 
              [attr.cx]="point.x" 
              [attr.cy]="point.y" 
              [attr.r]="config().pointRadius" 
              [attr.fill]="config().pointColor"
              class="chart-point"/>
          }
        }
        
        <!-- X-axis labels -->
        @for (point of chartPoints(); track point.x) {
          <text 
            [attr.x]="point.x" 
            [attr.y]="(config().height ?? 120) - 5" 
            text-anchor="middle" 
            [attr.fill]="config().labelColor"
            class="chart-label">
            {{ point.label }}
          </text>
        }
        
        <!-- Y-axis values (min and max) -->
        <text 
          [attr.x]="padding().left - 5" 
          [attr.y]="padding().top + 5" 
          text-anchor="end" 
          [attr.fill]="config().valueColor"
          class="chart-value">
          {{ maxValue() }}
        </text>
        <text 
          [attr.x]="padding().left - 5" 
          [attr.y]="(config().height ?? 120) - padding().bottom - 10" 
          text-anchor="end" 
          [attr.fill]="config().valueColor"
          class="chart-value">
          {{ minValue() }}
        </text>
      </svg>
    </div>
  `,
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  data = input.required<ChartDataPoint[]>();
  chartConfig = input<Partial<ChartConfig>>({});

  // Default configuration
  private defaultConfig: ChartConfig = {
    width: 300,
    height: 120,
    strokeColor: '#3B82F6',
    strokeWidth: 2,
    pointColor: '#3B82F6',
    pointRadius: 3,
    showPoints: true,
    showGrid: false,
    gridColor: '#E5E7EB',
    labelColor: '#6B7280',
    valueColor: '#6B7280',
    animationDuration: 300
  };

  // Merge default config with provided config
  config = computed(() => ({
    ...this.defaultConfig,
    ...this.chartConfig()
  }));

  // Chart padding
  padding = computed(() => ({
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }));

  // Chart dimensions (excluding padding)
  chartDimensions = computed(() => ({
    width: (this.config().width ?? 300) - this.padding().left - this.padding().right,
    height: (this.config().height ?? 120) - this.padding().top - this.padding().bottom
  }));

  // Min and max values from data
  minValue = computed(() => Math.min(...this.data().map(d => d.value)));
  maxValue = computed(() => Math.max(...this.data().map(d => d.value)));

  // Value range
  valueRange = computed(() => this.maxValue() - this.minValue() || 1);

  // Grid spacing
  gridSpacing = computed(() => ({
    x: this.chartDimensions().width / (this.data().length - 1 || 1),
    y: this.chartDimensions().height / 4
  }));

  // Calculate chart points
  chartPoints = computed(() => {
    const data = this.data();
    if (!data.length) return [];

    const width = this.chartDimensions().width;
    const height = this.chartDimensions().height;
    const padding = this.padding();
    const minVal = this.minValue();
    const range = this.valueRange();

    return data.map((point, index) => ({
      x: padding.left + (index / (data.length - 1)) * width,
      y: padding.top + height - ((point.value - minVal) / range) * height,
      label: point.label,
      value: point.value
    }));
  });

  // Generate SVG path for the line
  linePath = computed(() => {
    const points = this.chartPoints();
    if (!points.length) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  });
} 