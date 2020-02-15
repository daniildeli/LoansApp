import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILoan, ILoansResponse } from '../core/models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  public constructor(private httpClient: HttpClient) { }
  public getLoans$(): Observable<ILoan[]> {
    return this.httpClient.get<ILoansResponse>('assets/current-loans.json').pipe(
      map((data: ILoansResponse) => data.loans)
    );
  }
}
