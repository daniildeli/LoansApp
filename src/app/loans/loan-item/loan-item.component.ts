import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ILoan } from './../../core/models/loan.model';
import { LoanDetailComponent } from '../loan-detail/loan-detail.component';

@Component({
  selector: 'loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.scss']
})
export class LoanItemComponent {
  @Input() public readonly loan: ILoan;
  @Input() public readonly isInvested: boolean;
  public constructor(public dialog: MatDialog) {}

  public openDetails(): void {
    this.dialog.open(LoanDetailComponent, {
      width: '500px',
      data: this.loan,
      panelClass: 'custom-dialog'
    });
  }
}
