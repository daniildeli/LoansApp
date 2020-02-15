import { ILoan } from '../core/models/loan.model';
import { LoansActions, LoansActionsTypes } from './loans.actions';

export interface ILoansState {
    data: ILoan[];
    investedLoansIds: string[];
}

export const initialState: ILoansState = {
    data: [],
    investedLoansIds: []
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
        case LoansActionsTypes.InvestToLoan: {
            const currentLoan: ILoan = state.data.find(loan => loan.id === action.payload.loanId);
            if (!currentLoan) {
                return { ...state };
            }
            const newAmount: number = +action.payload.investmentAmount + +currentLoan.amount.replace(',', '.');
            const newAvailable: number = +currentLoan.available.replace(',', '.') - +action.payload.investmentAmount;
            const updatedLoan: ILoan = {
                ...currentLoan,
                amount: newAmount.toFixed(3).replace('.', ','),
                available: newAvailable.toFixed(3).replace('.', ','),
            };

            return {
                ...state,
                data: [ ...state.data ].map(loan => loan.id === action.payload.loanId ? updatedLoan : loan),
                investedLoansIds: state.investedLoansIds.includes(action.payload.loanId) ? [
                    ...state.investedLoansIds
                ] : [
                    ...state.investedLoansIds,
                    action.payload.loanId
                ]
            };
        }
        default: {
            return {...state};
        }
    }
}
