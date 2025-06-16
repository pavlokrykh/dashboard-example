import { inject, Injectable } from '@angular/core';
import { PoliciesClient } from '@core/api/dashboard/policies.client';

@Injectable()
export class PoliciesService {
  private readonly policiesClient = inject(PoliciesClient);

  getPolicies() {
    return this.policiesClient.getPolicies();
  }
}
