import { Component, OnInit } from '@angular/core';
import { UsersHeaders } from '../../../../core/constants/headers';
import { TableHeader } from '../../../../core/interfaces/table-header';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource : string;
  public columns : Array<TableHeader> = UsersHeaders;

  constructor() {
    this.dataSource = "users"
  }

  ngOnInit(): void {
  }

}
