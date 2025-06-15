import { Component } from '@angular/core';
import { AccountsListComponent } from '@dashboard/view/components/accounts-list/accounts-list.component';
import { PortfolioGoalsComponent } from '@dashboard/view/components/portfolio-goals/portfolio-goals.component';
import { QuickActionsComponent } from '@dashboard/view/components/quick-actions/quick-actions.component';
import { WorkQueueComponent } from '@dashboard/view/components/work-queue/work-queue.component';
// eslint-disable-next-line max-len
import { MarketIntelligenceComponent } from '@dashboard/view/components/market-intelligence/market-intelligence.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    WorkQueueComponent,
    PortfolioGoalsComponent,
    QuickActionsComponent,
    MarketIntelligenceComponent,
    AccountsListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
