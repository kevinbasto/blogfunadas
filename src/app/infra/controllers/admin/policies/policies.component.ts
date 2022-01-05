import { Component, OnInit } from '@angular/core';
import { TersmHeaders } from '../../../../core/constants/headers';
import { TableHeader } from '../../../../core/interfaces/table-header';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  public dataSource : string;
  public columns : Array<TableHeader> = TersmHeaders

  constructor() {
    this.dataSource = "terms"
  }

  ngOnInit(): void {
  }

}
