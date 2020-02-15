import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ILoan } from './../../core/models/loan.model.js';
import { LoansService } from '../loans.service.js';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent implements OnInit {
  public loansList$: Observable<ILoan[]>;
  public constructor(
    private loansService: LoansService
  ) { }

  public ngOnInit(): void {
    this.loansList$ = this.loansService.getLoans$();
  }

}
