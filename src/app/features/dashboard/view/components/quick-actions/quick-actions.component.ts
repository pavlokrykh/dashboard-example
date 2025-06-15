import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quick-actions',
  imports: [CommonModule],
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent {
  quickActions = [
    { label: 'New Submission', action: 'newSubmission' },
    { label: 'Quote Builder', action: 'quoteBuilder' },
    { label: 'Risks Models', action: 'risksModels' },
    { label: 'Documents Upload', action: 'documentsUpload' },
  ];

  onActionClick(action: string): void {
    console.log(`Action clicked: ${action}`);
    // TODO: Implement action handlers
  }
}
