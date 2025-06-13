import { Component, inject, OnInit } from '@angular/core';
import { WorkQueueService } from '@dashboard/data-access/services/work-queue.service';

@Component({
  selector: 'app-work-queue-component',
  imports: [],
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss'],
})
export class WorkQueueComponent implements OnInit {
  private readonly workQueueService = inject(WorkQueueService);

  ngOnInit(): void {
    this.workQueueService.getWorkQueue().subscribe({
      next: (data) => {
        console.log('Work Queue Data:', data);
      },
      error: (error) => {
        console.error('Error fetching work queue data:', error);
      },
    });
  }
}
