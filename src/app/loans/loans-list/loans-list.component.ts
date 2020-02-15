import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ILoan } from './../../core/models/loan.model.js';
import { Store, select } from '@ngrx/store';
import { IState } from './../../state';
import { LoadLoans } from './../../state/loans.actions';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent implements OnInit {
  public loansList$: Observable<ILoan[]>;
  public constructor(
    private store: Store<IState>
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadLoans());
    this.loansList$ = this.store.pipe(
      select('loans', 'data')
    );
  }
}
