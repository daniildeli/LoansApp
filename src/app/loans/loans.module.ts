import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoansListComponent } from './loans-list/loans-list.component';
import { LoanItemComponent } from './loan-item/loan-item.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';

@NgModule({
  declarations: [LoansListComponent, LoanItemComponent, LoanDetailComponent],
  imports: [
    CommonModule
  ]
})
export class LoansModule { }
