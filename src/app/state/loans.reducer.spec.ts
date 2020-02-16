import * as fromReducer from "./loans.reducer";
import * as fromActions from "./loans.actions";
import { ILoan } from "../core/models/loan.model";

describe("LoansReducer", () => {
  const initialState: fromReducer.ILoansState = { ...fromReducer.initialState };
  const loansList: ILoan[] = [
    {
      id: "1",
      title: "Voluptate et sed tempora qui quisquam.",
      tranche: "A",
      available: "11,959",
      annualised_return: "8.60",
      term_remaining: "864000",
      ltv: "48.80",
      amount: "85,754"
    },
    {
      id: "5",
      title: "Consectetur ipsam qui magnam minus dolore ut fugit.",
      tranche: "B",
      available: "31,405",
      annualised_return: "7.10",
      term_remaining: "1620000",
      ltv: "48.80",
      amount: "85,754"
    },
    {
      id: "12",
      title:
        "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
      tranche: "C",
      available: "12,359",
      annualised_return: "4.80",
      term_remaining: "879000",
      ltv: "48.80",
      amount: "85,754"
    }
  ];
  describe("unknown action", () => {
    it("should return initial state", () => {
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        undefined,
        {} as any
      );
      expect(resultSTate).toEqual(initialState);
    });
  });
  describe("Load Loans action", () => {
    it("should return the same state", () => {
      const action: fromActions.LoadLoans = new fromActions.LoadLoans();
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initialState,
        action
      );
      expect(resultSTate).toEqual(initialState);
    });
  });
  describe("Load Loans success action", () => {
    it("should return state with data", () => {
      const action: fromActions.LoadLoansSuccess = new fromActions.LoadLoansSuccess(
        loansList
      );
      const expectedState: fromReducer.ILoansState = {
        ...fromReducer.initialState,
        data: [...loansList]
      };
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initialState,
        action
      );
      expect(resultSTate).toEqual(expectedState);
    });
  });
  describe("Load Loans error action", () => {
    it("should return the same state", () => {
      const action: fromActions.LoadLoansError = new fromActions.LoadLoansError(
        new Error()
      );
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initialState,
        action
      );
      expect(resultSTate).toEqual(initialState);
    });
  });
  describe("Invest to loan action", () => {
    it("should return the same state because there is no loan with such id", () => {
      const action: fromActions.InvestToLoan = new fromActions.InvestToLoan({
        loanId: "",
        investmentAmount: 1
      });
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initialState,
        action
      );
      expect(resultSTate).toEqual(initialState);
    });
    it("should change amounts in loan, add id to ids array and return new state", () => {
      const initState: fromReducer.ILoansState = {
        ...fromReducer.initialState,
        data: [
          {
            id: "12",
            title:
              "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
            tranche: "C",
            available: "12,359",
            annualised_return: "4.80",
            term_remaining: "879000",
            ltv: "48.80",
            amount: "85,754"
          }
        ]
      };
      const action: fromActions.InvestToLoan = new fromActions.InvestToLoan({
        loanId: "12",
        investmentAmount: 12000
      });
      const expectedState: fromReducer.ILoansState = {
        ...fromReducer.initialState,
        data: [
          {
            id: "12",
            title:
              "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
            tranche: "C",
            available: "359",
            annualised_return: "4.80",
            term_remaining: "879000",
            ltv: "48.80",
            amount: "97,754"
          }
        ],
        investedLoansIds: ["12"]
      };
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initState,
        action
      );
      expect(resultSTate).toEqual(expectedState);
    });
    it("should change amounts in loan, does not add id to ids array and return new state", () => {
      const initState: fromReducer.ILoansState = {
        ...fromReducer.initialState,
        data: [
          {
            id: "12",
            title:
              "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
            tranche: "C",
            available: "12,359",
            annualised_return: "4.80",
            term_remaining: "879000",
            ltv: "48.80",
            amount: "85,754"
          }
        ],
        investedLoansIds: ["12"]
      };
      const action: fromActions.InvestToLoan = new fromActions.InvestToLoan({
        loanId: "12",
        investmentAmount: 12000
      });
      const expectedState: fromReducer.ILoansState = {
        ...fromReducer.initialState,
        data: [
          {
            id: "12",
            title:
              "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
            tranche: "C",
            available: "359",
            annualised_return: "4.80",
            term_remaining: "879000",
            ltv: "48.80",
            amount: "97,754"
          }
        ],
        investedLoansIds: ["12"]
      };
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initState,
        action
      );
      expect(resultSTate).toEqual(expectedState);
    });
    it("should not change state because investment amount is bigger than available", () => {
      const initState: fromReducer.ILoansState = {
        ...fromReducer.initialState,
        data: [
          {
            id: "12",
            title:
              "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
            tranche: "C",
            available: "12,359",
            annualised_return: "4.80",
            term_remaining: "879000",
            ltv: "48.80",
            amount: "85,754"
          }
        ]
      };
      const action: fromActions.InvestToLoan = new fromActions.InvestToLoan({
        loanId: "12",
        investmentAmount: 20000
      });
      const resultSTate: fromReducer.ILoansState = fromReducer.reducer(
        initState,
        action
      );
      expect(resultSTate).toEqual(initState);
    });
  });
});
