import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, Subscriber } from 'rxjs';
import { filter, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  public tableName : Subject<string> = new Subject<string>();
  public table : Subject<Array<any>> = new Subject<Array<any>>();
  public size : Subject<number> = new Subject<number>();
  public headers : Subject<Array<string>> = new Subject<Array<string>>();

  constructor(
    private router : Router,
    private firestore : AngularFirestore
  ){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((route : any) => {
      let table = this.getMenuName(route.url);
      this.tableName.next(table)

      this.firestore.collection(table, fn => fn.limit(5)).valueChanges().pipe(take(1)).toPromise()
      .then(res => this.table.next(res));

      this.firestore.doc(`/info/tables`).valueChanges().pipe(take(1)).toPromise()
      .then( (tables : any) => {
        this.size.next(tables[table].size)
        this.headers.next(tables[table].columns)
      })
    })
  }

  getPage(page  : number, pageSize : number, table : string) : Promise<Array<any>>{
    return new Promise<Array<any>>((resolve, reject) => {
      let startAt : number = (pageSize * page);
      this.firestore.collection(table, fn => fn.orderBy('id', 'asc').startAt( startAt ).limit(pageSize) ).valueChanges().pipe(take(1)).toPromise()
      .then(page => resolve(page))
      .catch(err => reject(err));
    })
  }

  private getMenuName(route : string) : string{
    let routeTree = route.split("/").filter(element => {
      if(element != "")
        return element;
    });
    return routeTree[routeTree.length - 1];
  }
}
