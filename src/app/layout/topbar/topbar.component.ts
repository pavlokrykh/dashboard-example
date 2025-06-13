import { Component, computed, inject } from '@angular/core';
import { UserStore } from '@core/states/user.store';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private readonly userStore = inject(UserStore);

  private readonly $user = this.userStore.user;

  readonly $userName = computed(() => this.$user()?.name || 'Guest');
}
