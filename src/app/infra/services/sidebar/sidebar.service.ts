import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { Sidebar } from '../../../core/services/sidebar';

@Injectable()
export class SidebarService implements Sidebar{

  constructor(
    private router : Router,
    private firestore : AngularFirestore
  ) { }

  getMenuItems(menu : string) : Promise<Array<MenuItem>>{
    return new Promise<Array<MenuItem>>(async (resolve, reject) => {
      let menuItems = this.getMenuFromLocalHost(menu);
      if(!menuItems){
        this.retrieveFromFirebase(menu)
        .then(items => resolve(items))
        .catch(err => reject(err));
      }
        
        
        
    })
  }

  private getMenuFromLocalHost(menu : string) : Array<MenuItem>{
    let menuStorage = window.localStorage.getItem("menu");
    if(menuStorage != menu)
      return null;
    let items : Array<MenuItem> = JSON.parse(window.localStorage.getItem("items"));
    return items;
  }

  private retrieveFromFirebase(menu : string) {
    return new Promise<Array<MenuItem>>((resolve, reject) => {
      
      this.firestore.doc(`/info/${menu}Menu`).valueChanges()
      .pipe(take(1)).toPromise()
      .then((items : any) => {
        this.storeMenuInLocalhost(menu, items.items)
        resolve(items.items)
      })
      .catch(error => reject(error));
    })
  }

  private storeMenuInLocalhost(menu : string, menuItems : Array<MenuItem>){
    window.localStorage.setItem("menu", menu);
    window.localStorage.setItem("items", JSON.stringify(menuItems));
  }
  
}
