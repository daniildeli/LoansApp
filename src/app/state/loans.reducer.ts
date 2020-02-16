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

export function reducer(
  state: ILoansState = initialState,
  action: LoansActions
): ILoansState {
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
      const currentLoan: ILoan = state.data.find(
        loan => loan.id === action.payload.loanId
      );
      if (!currentLoan) {
        return { ...state };
      }
      const newAmount: number =
        +action.payload.investmentAmount + +currentLoan.amount.replace(',', '');
      const newAvailable: number =
        +currentLoan.available.replace(',', '') -
        +action.payload.investmentAmount;
      if (newAvailable < 0) {
        return { ...state };
      }
      const updatedLoan: ILoan = {
        ...currentLoan,
        amount: `${newAmount}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,'),
        available: `${newAvailable}`.replace(
          /(\d)(?=(\d\d\d)+([^\d]|$))/g,
          '$1,'
        )
      };

      return {
        ...state,
        data: [...state.data].map(loan =>
          loan.id === action.payload.loanId ? updatedLoan : loan
        ),
        investedLoansIds: state.investedLoansIds.includes(action.payload.loanId)
          ? [...state.investedLoansIds]
          : [...state.investedLoansIds, action.payload.loanId]
      };
    }
    default: {
      return { ...state };
    }
  }
}
