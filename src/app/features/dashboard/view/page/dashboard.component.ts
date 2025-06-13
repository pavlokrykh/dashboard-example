import { Component } from '@angular/core';
import { WorkQueueComponent } from '../components/work-queue.component';

@Component({
  selector: 'app-dashboard',
  imports: [WorkQueueComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
