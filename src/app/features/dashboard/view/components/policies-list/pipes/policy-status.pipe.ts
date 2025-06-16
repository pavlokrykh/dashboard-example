import { Pipe, PipeTransform } from '@angular/core';
import { POLICY_STATUS_TRANSLATIONS, PolicyStatus } from '@shared/enums/policy-status.enum';

@Pipe({
  name: 'policyStatus',
})
export class PolicyStatusPipe implements PipeTransform {
  transform(status: PolicyStatus): string {
    return POLICY_STATUS_TRANSLATIONS[status] || 'Unknown';
  }
}
