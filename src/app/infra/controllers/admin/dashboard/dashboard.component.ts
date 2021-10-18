import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardHeaders } from '../../../../core/constants/headers';
import { TableHeader } from '../../../../core/interfaces/table-header';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource : string;
  public columns : Array<TableHeader> = DashboardHeaders;

  constructor() {
    this.dataSource = "updates";
  }

  ngOnInit(): void {
  }

}
