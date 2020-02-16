import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { IState } from './index';
import { ILoansState } from './loans.reducer';
import { ILoan } from '../core/models/loan.model';

export const selectLoansState: MemoizedSelector<
  IState,
  ILoansState
> = createFeatureSelector('loans');

export const selectLoans: MemoizedSelector<IState, ILoan[]> = createSelector(
  selectLoansState,
  (state: ILoansState) => state.data
);

export const selectInvestedLoansIds: MemoizedSelector<
  IState,
  string[]
> = createSelector(
  selectLoansState,
  (state: ILoansState) => state.investedLoansIds
);

export const selectTotalAvailableAmount: MemoizedSelector<
  IState,
  string
> = createSelector(selectLoans, (data: ILoan[]) =>
  !!data && !!data.length
    ? data
        .reduce((prev, current) => ({
          ...prev,
          available: (
            +prev.available.replace(',', '') +
            +current.available.replace(',', '')
          ).toString()
        }))
        .available.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
    : '0.00'
);
