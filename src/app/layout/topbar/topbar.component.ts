import { Component, computed, inject } from '@angular/core';
import { UserStore } from '@core/states/user.store';
import { WorkQueueService } from '@dashboard/data-access/services/work-queue.service';
import { ProfileCircleComponent } from '@shared/components/profile-circle/profile-circle.component';
import { SearchComponent } from '@shared/components/search/search.component';

@Component({
  selector: 'app-topbar',
  imports: [ProfileCircleComponent, SearchComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  providers: [WorkQueueService],
})
export class TopbarComponent {
  private readonly userStore = inject(UserStore);
  private readonly workQueueService = inject(WorkQueueService);

  private readonly $user = this.userStore.user;
  readonly $tasks = this.workQueueService.$tasks;

  readonly $userName = computed(() => this.$user()?.name || 'Guest');
  readonly $name = computed(() => this.$userName().split(' ')[0]);

  onSearch(searchValue: string): void {
    this.workQueueService.searchTasks(searchValue);
  }
}
