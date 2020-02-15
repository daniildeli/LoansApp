import { ILoan } from '../core/models/loan.model';
import { LoansActions, LoansActionsTypes } from './loans.actions';


export interface ILoansState {
    data: ILoan[];
}

export const initialState: ILoansState = {
    data: []
};

export function reducer(state: ILoansState = initialState, action: LoansActions): ILoansState {
    switch (action.type) {
        case LoansActionsTypes.LoadLoans: {
            return { ...state };
        }
        case LoansActionsTypes.LoadLoansSuccess: {
            return {
                ...state,
                data: [...action.payload]
            };
        }
        case LoansActionsTypes.LoadLoansError: {
            return {
                ...state
            };
        }
        default: {
            return {...state};
        }
    }
}
