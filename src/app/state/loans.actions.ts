import { Action } from '@ngrx/store';
import { ILoan } from '../core/models/loan.model';

export enum LoansActionsTypes {
    LoadLoans = '[Loans] Load Loans',
    LoadLoansSuccess = '[Loans] Load Loans Success',
    LoadLoansError = '[Loans] Load Loans Error'
}

export class LoadLoans implements Action {
    public readonly type: LoansActionsTypes.LoadLoans = LoansActionsTypes.LoadLoans;
}

export class LoadLoansSuccess implements Action {
    public readonly type: LoansActionsTypes.LoadLoansSuccess = LoansActionsTypes.LoadLoansSuccess;
    public constructor(public payload: ILoan[]) {}
}

export class LoadLoansError implements Action {
    public readonly type: LoansActionsTypes.LoadLoansError = LoansActionsTypes.LoadLoansError;
    public constructor(public payload: Error) {}
}

export type LoansActions = LoadLoans | LoadLoansSuccess | LoadLoansError;
