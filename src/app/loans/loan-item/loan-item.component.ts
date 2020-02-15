import { Component, OnInit, Input } from '@angular/core';
import { ILoan } from './../../core/models/loan.model';

@Component({
  selector: 'loan-item',
  templateUrl: './loan-item.component.html',
  styleUrls: ['./loan-item.component.scss']
})
export class LoanItemComponent implements OnInit {
  @Input() public loan: ILoan;
  public constructor() { }

  public ngOnInit(): void {
  }

}
