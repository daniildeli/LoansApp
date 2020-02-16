import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import {
  LoansActionsTypes,
  LoadLoansSuccess,
  LoadLoansError
} from './loans.actions';
import { ILoansResponse } from '../core/models/loan.model';

@Injectable()
export class LoansEffects {
  public constructor(
    private actions$: Actions,
    private httpClient: HttpClient
  ) {}
  @Effect()
  public loadEvents$: Observable<Action> = this.actions$.pipe(
    ofType(LoansActionsTypes.LoadLoans),
    mergeMap(() =>
      this.getLoans$().pipe(
        map(
          (loansResponse: ILoansResponse) =>
            new LoadLoansSuccess(loansResponse.loans)
        ),
        catchError((err: Error) => of(new LoadLoansError(err)))
      )
    )
  );

  private getLoans$(): Observable<ILoansResponse> {
    return this.httpClient.get<ILoansResponse>('assets/current-loans.json');
  }
}
