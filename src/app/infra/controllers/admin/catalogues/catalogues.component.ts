import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NovelsHeaders } from '../../../../core/constants/headers';
import { TableHeader } from '../../../../core/interfaces/table-header';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.css']
})
export class CataloguesComponent implements OnInit {

  public dataSource : string
  public columns : Array<TableHeader> = NovelsHeaders;

  constructor(
    public router : Router
  ) { 
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd)).subscribe( (event : any) => {
      let catalogue = this.getCatalogueName(event.url);
      this.dataSource = catalogue;
    })
  }

  ngOnInit(): void {
  }

  private getCatalogueName(url : string){
    return url.split("/").filter(element => {
      if(element != "")
        return element;
    })[1];
  }
}
