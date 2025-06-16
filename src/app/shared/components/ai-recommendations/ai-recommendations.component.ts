import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export interface AiRecommendation {
  title: string;
  description: string;
  action: string;
}

@Component({
  selector: 'app-ai-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-recommendations.component.html',
  styleUrls: ['./ai-recommendations.component.scss'],
})
export class AiRecommendationsComponent {
  $recommendations = input<AiRecommendation[]>([], { alias: 'recommendations' });

  onApplyRecommendation(recommendation: AiRecommendation): void {
    // Handle apply action - could emit event or perform action
    console.log('Applying recommendation:', recommendation);
  }
}
