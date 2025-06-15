import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAccountListItem } from '@core/models/dashboard/accounts-list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsListClient {
  private readonly mockUrl = '/mock/accounts-list.json';
  private readonly http = inject(HttpClient);

  getAccountsList(): Observable<IAccountListItem[]> {
    return this.http.get<IAccountListItem[]>(this.mockUrl);
  }
}
