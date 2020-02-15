import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LoansService } from '../loans/loans.service';
import { LoansActionsTypes, LoadLoansSuccess, LoadLoansError } from './loans.actions';
import { ILoan } from '../core/models/loan.model';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class LoansEffects {
  public constructor(private actions$: Actions, private loansService: LoansService) {}
  @Effect()
  public loadEvents$: Observable<Action> = this.actions$.pipe(
    ofType(LoansActionsTypes.LoadLoans),
    mergeMap(() =>
      this.loansService.getLoans$().pipe(
        map((loans: ILoan[]) => new LoadLoansSuccess(loans)),
        catchError((err: Error) => of(new LoadLoansError(err)))
      )
    )
  );
}
