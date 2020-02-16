import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ILoan } from './../../core/models/loan.model';
import { IState } from './../../state';
import {
  selectLoans,
  selectTotalAvailableAmount
} from './../../state/loans.selectors';
import { LoansService } from '../loans.service';

@Component({
  selector: 'loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent implements OnInit {
  public loansList$: Observable<ILoan[]>;
  public totalAvailableAmount$: Observable<string>;
  public constructor(
    private store: Store<IState>,
    private loansService: LoansService
  ) {}

  public ngOnInit(): void {
    this.loansService.loadLoans();
    this.loansList$ = this.store.pipe(select(selectLoans));
    this.totalAvailableAmount$ = this.store.pipe(
      select(selectTotalAvailableAmount)
    );
  }
  public isInvested$(id: string): Observable<boolean> {
    return this.loansService.isLoanInvested$(id);
  }
}
