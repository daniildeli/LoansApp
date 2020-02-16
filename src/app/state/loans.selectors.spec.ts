import * as fromReducer from "./loans.reducer";
import * as fromSelectors from "./loans.selectors";
import { IState } from "./index";

describe("Loans Selectors", () => {
  const initialLoansState: fromReducer.ILoansState = {
    ...fromReducer.initialState,
    data: [
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
      }
    ],
    investedLoansIds: ["1"]
  };
  const initialAppState: IState = {
    loans: { ...initialLoansState }
  };
  describe("selectLoansState selector", () => {
    it("should return loans state", () => {
      expect(fromSelectors.selectLoansState(initialAppState)).toEqual(
        initialLoansState
      );
    });
  });
  describe("selectLoans selector", () => {
    it("should return list of loans", () => {
      expect(fromSelectors.selectLoans(initialAppState)).toEqual(
        initialLoansState.data
      );
    });
  });
  describe("selectInvestedLoansIds selector", () => {
    it("should return array of ids", () => {
      expect(fromSelectors.selectInvestedLoansIds(initialAppState)).toEqual(
        initialLoansState.investedLoansIds
      );
    });
  });
  describe("selectTotalAvailableAmount selector", () => {
    it("should calculate all available amounts and return as string", () => {
      expect(fromSelectors.selectTotalAvailableAmount(initialAppState)).toEqual(
        "43,364"
      );
    });
    it("should return 0.00 as string if there are no loans", () => {
      expect(
        fromSelectors.selectTotalAvailableAmount({
          loans: { ...fromReducer.initialState }
        })
      ).toEqual("0.00");
    });
  });
});
