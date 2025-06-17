import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';

export interface NavigationGroup {
  id: string;
  label: string;
  subnodes: NavigationNode[];
}

export interface NavigationNode {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navigation-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.scss'],
})
export class NavigationTreeComponent {
  readonly $activeGroup = signal<string | null>('decision-support');
  readonly $activeNode = signal<string | null>('winnability');

  readonly nodeSelected = output<string>();

  readonly navigationGroups: NavigationGroup[] = [
    {
      id: 'decision-support',
      label: 'DECISION SUPPORT',
      subnodes: [
        { id: 'winnability', label: 'Winnability' },
        { id: 'exposure-review', label: 'Exposure Review & Suggested Coverage' },
        { id: 'portfolio-strategy', label: 'Portfolio Strategy Alignment' },
        { id: 'broker-analytics', label: 'Broker Analytics' },
      ],
    },
    {
      id: 'risk-assessment',
      label: 'RISK ASSESSMENT',
      subnodes: [
        { id: 'risk-analysis', label: 'Risk Analysis' },
        { id: 'loss-projections', label: 'Loss Projections' },
        { id: 'market-conditions', label: 'Market Conditions' },
        { id: 'competitor-analysis', label: 'Competitor Analysis' },
        { id: 'pricing-models', label: 'Pricing Models' },
        { id: 'underwriting-guidelines', label: 'Underwriting Guidelines' },
      ],
    },
    {
      id: 'documents-compliance',
      label: 'DOCUMENTS AND COMPLIANCE',
      subnodes: [
        { id: 'regulatory-filings', label: 'Regulatory Filings' },
        { id: 'audit-reports', label: 'Audit Reports' },
      ],
    },
  ];

  constructor() {
    this.nodeSelected.emit('winnability');
  }

  onGroupClick(groupId: string): void {
    if (this.$activeGroup() === groupId) {
      this.$activeGroup.set(null);
      this.$activeNode.set(null);
    } else {
      this.$activeGroup.set(groupId);
      // Set first subnode as active when opening a group
      const group = this.navigationGroups.find((g) => g.id === groupId);
      if (group && group.subnodes.length > 0) {
        this.$activeNode.set(group.subnodes[0].id);
        this.nodeSelected.emit(group.subnodes[0].id);
      }
    }
  }

  onNodeClick(nodeId: string): void {
    this.$activeNode.set(nodeId);
    this.nodeSelected.emit(nodeId);
  }

  isGroupOpen(groupId: string): boolean {
    return this.$activeGroup() === groupId;
  }

  isNodeActive(nodeId: string): boolean {
    return this.$activeNode() === nodeId;
  }
}
