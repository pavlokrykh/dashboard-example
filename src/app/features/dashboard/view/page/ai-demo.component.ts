import { Component } from '@angular/core';
import {
  AiRecommendation,
  AiRecommendationsComponent,
} from '@shared/components/ai-recommendations/ai-recommendations.component';

@Component({
  selector: 'app-ai-demo',
  standalone: true,
  imports: [AiRecommendationsComponent],
  template: `
    <div class="ai-demo-page">
      <h1>AI-Powered Recommendations Demo</h1>
      <div class="recommendations-container">
        <app-ai-recommendations [recommendations]="recommendations" />
      </div>
    </div>
  `,
  styles: [
    `
      .ai-demo-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }
      h1 {
        color: #e5e7eb;
        font-weight: 500;
        margin-bottom: 2rem;
      }
      .recommendations-container {
        width: 100%;
      }
    `,
  ],
})
export class AiDemoComponent {
  recommendations: AiRecommendation[] = [
    {
      title: 'Offer 5% premium discount in exchange for 3-year commitment',
      description:
        'Historical win rate increases 24% with multi-year commitments. Current pricing is 12% above market ' +
        'average. This approach would strengthen retention while maintaining adequate profitability.',
      action: 'Apply',
    },
    {
      title: 'Propose risk control services for cargo handling procedures',
      description:
        'Can potentially reduce loss ratio by 15-20% based on similar maritime accounts in your portfolio. ' +
        'Specific focus on loading/unloading operations would address the most frequent claim scenarios.',
      action: 'Apply',
    },
  ];
}
