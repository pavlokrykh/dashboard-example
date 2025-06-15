import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountDetails } from '@core/models/account/account-details.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountDetailsClient {
  private readonly mockUrl = '/mock/account-details.json';
  private readonly http = inject(HttpClient);

  getAccountDetails(): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.mockUrl);
  }
}
