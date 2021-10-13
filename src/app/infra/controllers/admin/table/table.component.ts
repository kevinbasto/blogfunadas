import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TableService } from './table.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public tableName : string;
  public displayedColumns: string[];
  public dataSource : Array<any>;
  public length : number;

  constructor(
    private table : TableService
  ){
    this.table.tableName.subscribe(tableName => {
      this.tableName = tableName;
    });
  }

  ngOnInit(): void {
    
    this.table.size.subscribe(size => {
      this.length = size;
    })
    this.table.table.subscribe(table => {
      this.dataSource = table;
    });
    this.table.headers.subscribe(headers => {
      this.displayedColumns = headers;
    });
    
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe( (page : PageEvent) => {
      this.table.getPage(page.pageIndex, page.pageSize, this.tableName)
      .then((page : any) => this.dataSource = page)
    });
  }


  addItem(){
    
  }
}
