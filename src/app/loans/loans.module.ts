import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoansListComponent } from './loans-list/loans-list.component';
import { LoanItemComponent } from './loan-item/loan-item.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { MaterialModule } from '../core/modules/material.module';

@NgModule({
  declarations: [LoansListComponent, LoanItemComponent, LoanDetailComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [LoansListComponent, LoanItemComponent, LoanDetailComponent],
  entryComponents: [LoanDetailComponent]
})
export class LoansModule {}
