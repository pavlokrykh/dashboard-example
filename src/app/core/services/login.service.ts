import { inject, Injectable } from '@angular/core';
import { LoginClient } from '@core/api/login/login.client';
import { UserStore } from '@core/states/user.store';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly loginClient = inject(LoginClient);
  private readonly userStore = inject(UserStore);

  login() {
    return this.loginClient.getUser().pipe(
      tap((user) => {
        console.log(user);
        this.userStore.updateUser(user);
      }),
    );
  }
}
