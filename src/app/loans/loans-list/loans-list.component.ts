import { Component, OnInit } from '@angular/core';
import mockData from './../../../assets/current-loans.json';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent implements OnInit {
  public constructor() { }

  public ngOnInit(): void {
  }

}
