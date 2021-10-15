import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private columns : Subject<Array<string>>;
  private data : Subject<Array<any>>;
  private size : number;

  constructor(
    private router : Router,
    private firestore : AngularFirestore,
  ) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event : any) => {
      let navigation : NavigationEnd = event;
      let table = this.getTableName(navigation.url);
    });
  }

  private getTableName(route : string) : string{
    let routeTree = route.split("/").filter(element => {
      if(element != "")
        return element;
    });
    return routeTree[routeTree.length - 1];
  }
}
