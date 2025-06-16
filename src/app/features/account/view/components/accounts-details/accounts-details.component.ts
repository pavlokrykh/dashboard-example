import { AccountDetailsService } from '@account/data-access/services/account-details.service';
import { NavigationTreeComponent } from '@account/view/components/navigation-tree/navigation-tree.component';
// eslint-disable-next-line max-len
import { WinnabilityDetailsComponent } from '@account/view/components/winnability-details/winnability-details.component';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-accounts-details',
  standalone: true,
  imports: [CommonModule, NavigationTreeComponent, WinnabilityDetailsComponent],
  templateUrl: './accounts-details.component.html',
  styleUrls: ['./accounts-details.component.scss'],
})
export class AccountsDetailsComponent {
  private readonly accountDetailsService = inject(AccountDetailsService);

  readonly $selectedNode = signal<string | null>('winnability');

  onNodeSelected(nodeId: string): void {
    this.$selectedNode.set(nodeId);
  }

  showWinnabilityContent(): boolean {
    return this.$selectedNode() === 'winnability';
  }

  showContent(): boolean {
    return this.$selectedNode() !== null && this.$selectedNode() !== 'winnability';
  }

  get accountDetails() {
    return this.accountDetailsService.$accountDetails();
  }
}
