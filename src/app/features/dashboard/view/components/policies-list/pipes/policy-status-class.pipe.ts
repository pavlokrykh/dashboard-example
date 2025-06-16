import { Pipe, PipeTransform } from '@angular/core';
import { PolicyStatus } from '@shared/enums/policy-status.enum';
import { StatusColors } from '@shared/enums/status-colors.enum';

@Pipe({
  name: 'policyStatusClass',
})
export class PolicyStatusClassPipe implements PipeTransform {
  transform(status: PolicyStatus): StatusColors {
    switch (status) {
      case PolicyStatus.Active:
        return StatusColors.Success;
      case PolicyStatus.Pending:
        return StatusColors.Warning;
      default:
        return StatusColors.SecondaryDarker;
    }
  }
}
