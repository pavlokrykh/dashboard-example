import { Component, input } from '@angular/core';
import { GetInitialsPipe } from './pipes/get-initials.pipe';

@Component({
  selector: 'app-profile-circle',
  imports: [GetInitialsPipe],
  template: `
    <div class="profile-circle">
      {{ $name() | getInitials }}
    </div>
  `,
  styles: `
    @use 'variables' as *;

    .profile-circle {
      width: 2rem;
      height: 2rem;
      padding: 1.25rem;
      border-radius: 50%;
      background: linear-gradient(45deg, rgba($secondary-color, 0.3) 0%, rgba($secondary-color, 1) 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500; /* Placeholder for $fw-medium */
      font-size: 0.875rem;
    }
  `,
  standalone: true,
})
export class ProfileCircleComponent {
  $name = input.required<string>({ alias: 'name' });
}
