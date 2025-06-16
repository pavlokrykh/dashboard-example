import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPolicy } from '@core/models/dashboard/policy.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoliciesClient {
  private readonly mockUrl = '/mock/policies.json';
  private readonly http = inject(HttpClient);

  getPolicies(): Observable<IPolicy[]> {
    return this.http.get<IPolicy[]>(this.mockUrl);
  }
}
