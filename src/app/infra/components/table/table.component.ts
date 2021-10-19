import { AfterViewInit, Component, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TableHeader } from '../../../core/interfaces/table-header';


import { Table } from '../../../core/services/table';
import { tableServiceToken } from '../../services/services.token';

@Component({
  selector: 'app-generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  
  @Input() public dataSource : string;
  @Input() public inputHeaders : Array<TableHeader>
  public displayedColumns : Array<string> = [];
  public data : Array<any>;
  public length : number;
  @ViewChild(MatPaginator) public paginator : MatPaginator;

  constructor(
    @Inject(tableServiceToken) private table : Table,
  ) {
    this.length = 1000;
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.paginator.page.subscribe(page => {
      this.table.getdata(this.dataSource, page.pageIndex, page.pageSize)
      .then(data => { this.data = data })
      .catch(err => {});
    })
  }

  ngOnChanges(){
    // get the table size
    this.table.getTableData(this.dataSource)
    .then(length => this.length = length);
    // clean the columns
    this.displayedColumns = [];
    //set the pages
    this.inputHeaders.forEach(element => {
      this.displayedColumns.push(element.property);
    })
    // set paginator to page 1
    if(this.paginator)
      this.paginator.pageIndex = 0;
      //retrieves the data in the current size
    this.table.getdata(this.dataSource, 0, 5)
    .then(data => { this.data = data; })
    .catch(err => {})
  }

  test(row : any){
    this.table.navigateToUrl(row.url);
  }
}
