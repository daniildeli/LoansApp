import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as moment from 'moment';

import { IState } from '../state';
import { selectInvestedLoansIds } from '../state/loans.selectors';
import { LoadLoans, InvestToLoan } from '../state/loans.actions';

export function numberValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  return !!control.value && isNaN(+`${control.value}`.trim().replace(',', '.'))
    ? { notANumber: true }
    : null;
}

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private readonly investedLoansIds$: Observable<string[]> = this.store.pipe(
    select(selectInvestedLoansIds)
  );
  public constructor(
    private snackBar: MatSnackBar,
    private store: Store<IState>
  ) {}
  public loadLoans(): void {
    this.store.dispatch(new LoadLoans());
  }
  public showTooltip(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar-holder'
    });
  }
  public getDatesDiff(start: Date, end: Date): string {
    const startDate: moment.Moment = moment(start);
    const endDate: moment.Moment = moment(end);
    const yearDiff: number = endDate.diff(startDate, 'year');
    const monthDiff: number = endDate.diff(startDate, 'month');
    const dayDiff: number = endDate.diff(startDate, 'days');
    const hoursDiff: number = endDate.diff(startDate, 'hour');
    const minuteDiff: number = endDate.diff(startDate, 'minute');

    return !!yearDiff
      ? `${yearDiff} year(s)`
      : !!monthDiff
      ? `${monthDiff} month(s)`
      : !!dayDiff
      ? `${dayDiff} day(s)`
      : !!hoursDiff
      ? `${hoursDiff} hour(s)`
      : !!minuteDiff
      ? `${minuteDiff} minute(s)`
      : '';
  }
  public isLoanInvested$(loanId: string): Observable<boolean> {
    return this.investedLoansIds$.pipe(
      map(idsArr => !!idsArr && idsArr.includes(loanId))
    );
  }
  public onInvest(loanId: string, investmentAmount: number): void {
    this.store.dispatch(new InvestToLoan({ loanId, investmentAmount }));
  }
}
