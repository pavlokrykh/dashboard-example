import { NavigationTreeComponent } from '@account/view/components/navigation-tree/navigation-tree.component';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-accounts-details',
  standalone: true,
  imports: [CommonModule, NavigationTreeComponent],
  templateUrl: './accounts-details.component.html',
  styleUrls: ['./accounts-details.component.scss'],
})
export class AccountsDetailsComponent {
  readonly $selectedNode = signal<string | null>('winnability');

  onNodeSelected(nodeId: string): void {
    this.$selectedNode.set(nodeId);
  }

  showContent(): boolean {
    return this.$selectedNode() === 'winnability';
  }
}
