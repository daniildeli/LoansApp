export interface ILoan {
  title: string;
  tranche: string;
  available: string;
  annualised_return: string;
  term_remaining: string;
  ltv: string;
  amount: string;
  id: string;
}

export interface ILoansResponse {
  loans: ILoan[];
}
