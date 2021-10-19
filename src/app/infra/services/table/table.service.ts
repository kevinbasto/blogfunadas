import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Table } from '../../../core/services/table';

@Injectable()
export class TableService implements Table{

  constructor(
    private firestore : AngularFirestore,
    private router : Router
  ) { }

  getTableData(table : string) : Promise<number>{
    return new Promise<number>((resolve, reject) => {
      this.firestore.doc('/info/tables').get().pipe(take(1)).toPromise()
      .then( data => {
        let values : any = data.data();
        resolve(values[table].size);
      })
    });
  }

  getdata(table : string, page : number, pageSize : number) : Promise<Array<any>>{
    return new Promise<Array<any>>((resolve, reject) => {
      this.firestore.collection(table, ref =>  ref.orderBy('id', 'asc').where('id', '>=', page * pageSize).limit(pageSize))
      .valueChanges().pipe(take(1)).toPromise()
      .then(page => {
        page.map((element : any) => element.url = `${this.router.url}/${element.url}`);
        resolve(page)
      })
      .catch(err => { console.log(err); });
    });
  }
  
  navigateToUrl(url : string) : void{
    this.router.navigate([url]);
  }
}
