import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() private dataSource : string;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  public columns : Array<string>
  public data : Array<any>;
  public length : number;

  constructor() { }

  ngOnInit(): void {
  }

}
