import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommunicationClient } from '@core/api/account/communication.client';
import { Communication, CommunicationStatus } from '@core/models/account/communication.model';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { CommunicationStatusColorPipe } from './pipes/communication-status-color.pipe';
import { CommunicationStatusTextPipe } from './pipes/communication-status-text.pipe';

@Component({
  selector: 'app-communication',
  imports: [StatusBadgeComponent, CommunicationStatusColorPipe, CommunicationStatusTextPipe],
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss'],
})
export class CommunicationComponent {
  private readonly communicationClient = inject(CommunicationClient);

  readonly $communications = signal<Communication[]>([]);

  constructor() {
    this.loadCommunications();
  }

  shouldShowStatusBadge(status: CommunicationStatus): boolean {
    return status !== CommunicationStatus.Regular;
  }

  isNewMessage(status: CommunicationStatus): boolean {
    return status === CommunicationStatus.New;
  }

  shouldShowReplyButton(status: CommunicationStatus): boolean {
    return status !== CommunicationStatus.Responded;
  }

  onReply(communication: Communication): void {
    console.log('Reply to:', communication.title);
    // Implement reply functionality
  }

  private loadCommunications(): void {
    this.communicationClient
      .getCommunications$()
      .pipe(takeUntilDestroyed())
      .subscribe((communications) => {
        this.$communications.set(communications);
      });
  }
}
