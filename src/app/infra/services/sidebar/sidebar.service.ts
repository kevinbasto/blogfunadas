import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { adminSidebarElements, clientSidebarElements } from '../../../core/constants/sidebarElements';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { Auth } from '../../../core/services/auth/auth';
import { Sidebar } from '../../../core/services/sidebar';
import { AuthServicetoken } from '../services.token';

// setting the constants for the timeframe before very update
const milliseconds = 1000;
const minutes = 60;
const hours = 60;
const days = 1;
const timeFrame = days * hours * minutes * milliseconds;

@Injectable()
export class SidebarService implements Sidebar{

  menuItems : Subject<Array<MenuItem>>;

  constructor(
    private router : Router,
    private firestore : AngularFirestore,
    private afAuth : AngularFireAuth,
    @Inject(AuthServicetoken) private auth : Auth
  ) {
    this.menuItems = new Subject<Array<MenuItem>>();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event : any) => {
      let newEvent : NavigationEnd = event
      let appSide = this.getMenuName(newEvent.url);
      this.getMenu(appSide);
    })
  }

  private async getMenu(appSide : string){
    let menu = this.getEmbedMenuOptions(appSide);
    await this.retrieveGenresMenu().then(menuItems => { menu = [...menu, ...menuItems]});
    menu.map((element : MenuItem) => { 
      if(!element.url.includes(appSide))
        element.url = `/${appSide}/${element.url}`
    })
    await this.auth.getProfileRole().then(role => {
      if(role != "reader" && appSide == "client")
        menu.push({
          name: "ir al admin",
          url : "/admin/dashboard"
        })
      else if(role != "reader")
        menu.push({
          name: 'regresar al cliente',
          url : '/client/latest'
        })
    })
    
    this.menuItems.next(menu);
  }

  private getEmbedMenuOptions(appSide : string) : Array<MenuItem>{
    if(appSide == "client")
      return clientSidebarElements;
    else
      return adminSidebarElements;
  }

  private retrieveGenresMenu() : Promise<Array<MenuItem>>{
    return new Promise<Array<MenuItem>>((resolve, reject) => {
      let menu = this.getMenuInLocalhost();
      if(menu){
        resolve(menu)
        return;
      }
      this.getMenuInFirebase().then(menuItems => resolve(menuItems));
    })
  }

  private getMenuInLocalhost() : Array<MenuItem>{
    let menu = JSON.parse(window.localStorage.getItem("genres"));
    if(!menu)
      return null;
    let lastUpdate = parseInt(window.localStorage.getItem("lastUpdate"));
    let date = Date.now();
    if( (date - lastUpdate) > timeFrame )
      return null;
    return menu;
  }

  private getMenuInFirebase() : Promise<Array<MenuItem>>{
    return new Promise<Array<MenuItem>>((resolve, reject) => {
      this.firestore.doc('/info/genres').valueChanges()
      .pipe(take(1)).toPromise()
      .then((menuItems : any) => {
        resolve(menuItems.genres)
        this.storeMenuInLocalhost(menuItems.genres);
      })
      .catch(error => { })
    });
  }

  private storeMenuInLocalhost(menuItems : Array<MenuItem>){
    window.localStorage.setItem("genres", JSON.stringify(menuItems));
    window.localStorage.setItem("lastUpdate", Date.now().toString());
  }

  private getMenuName(route : string){
    return route.split("/").filter(element => {
      if(element != "")
        return element;
    })[0];
  }

  navigateToMenu() : void {
    this.router.navigate(['/client/latest']);
  }

  signOut() : void {
    this.afAuth.signOut()
    .then(() => this.router.navigate(['/auth/login']))
    .catch(error => {});
  }

  deleteSidebarElements(){
    window.localStorage.removeItem("genres")
  }
}
