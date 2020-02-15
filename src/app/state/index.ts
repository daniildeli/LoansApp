import { ActionReducerMap } from '@ngrx/store';
import * as fromLoans from './loans.reducer';

export interface IState {
  loans: fromLoans.ILoansState;
}

export const reducers: ActionReducerMap<IState> = {
  loans: fromLoans.reducer
};
