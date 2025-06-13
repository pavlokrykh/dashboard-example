import { Component } from '@angular/core';
import { PortfolioGoalsComponent } from '@dashboard/view/components/portfolio-goals/portfolio-goals.component';
import { WorkQueueComponent } from '@dashboard/view/components/work-queue/work-queue.component';

@Component({
  selector: 'app-dashboard',
  imports: [WorkQueueComponent, PortfolioGoalsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
