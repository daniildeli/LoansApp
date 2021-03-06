import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';

import { takeUntil, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ILoan } from './../../core/models/loan.model';
import { numberValidator, LoansService } from '../loans.service';

@Component({
  selector: 'loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();
  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly loan: ILoan,
    private dialogRef: MatDialogRef<LoanDetailComponent>,
    private loansService: LoansService
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.spyOnAmountField();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initForm(): void {
    const availableAmount: number = +this.loan.available.replace(',', '');
    this.form = new FormGroup({
      investmentAmount: new FormControl('', [
        Validators.min(0.01),
        Validators.max(availableAmount),
        Validators.required,
        numberValidator
      ])
    });
    if (availableAmount <= 0) {
      this.form.disable();
    }
  }

  private spyOnAmountField(): void {
    const amountControl: AbstractControl = this.form.controls.investmentAmount;
    amountControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(value => !!value && !!value.trim()),
        map(value => value.trim()),
        filter(value => value.includes(',') || value.startsWith('.'))
      )
      .subscribe(value => {
        const newValue: string = value.replace(',', '.');
        amountControl.setValue(
          newValue.startsWith('.') ? `0${newValue}` : newValue
        );
      });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.loansService.onInvest(
        this.loan.id,
        +this.form.controls.investmentAmount.value.trim().replace(',', '.')
      );
      this.dialogRef.close();
      this.loansService.showTooltip('Invested successfully!');
    }
  }

  public getDateDiff(): string {
    const currentDate: Date = new Date();

    return this.loansService.getDatesDiff(
      currentDate,
      new Date(currentDate.getTime() + +this.loan.term_remaining)
    );
  }
}
