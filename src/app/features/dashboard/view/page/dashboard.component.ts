import { Component } from '@angular/core';
import { AccountsListComponent } from '@dashboard/view/components/accounts-list/accounts-list.component';
import { PortfolioGoalsComponent } from '@dashboard/view/components/portfolio-goals/portfolio-goals.component';
import { WorkQueueComponent } from '@dashboard/view/components/work-queue/work-queue.component';

@Component({
  selector: 'app-dashboard',
  imports: [WorkQueueComponent, PortfolioGoalsComponent, AccountsListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
