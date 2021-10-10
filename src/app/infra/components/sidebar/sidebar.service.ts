import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { Sidebar } from '../../../core/services/sidebar';
import { SidebarServiceToken } from '../../services/services.token';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuItems : Observable<Array<MenuItem>>;

  constructor(
    @Inject(SidebarServiceToken) private sidebar : Sidebar,
    private router : Router,
    private route : ActivatedRoute
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event : any) => {
      this.menuItems = new Observable<Array<MenuItem>>(observer => {
        let menu = this.getMenuName(event.url);
        this.getMenu(menu)
        .then(items => observer.next(items))
        .catch(error => {});
      });
    })
  }

  private getMenu(menu : string) : Promise<Array<MenuItem>> {
    return new Promise<Array<MenuItem>>((resolve, reject) => {
      this.sidebar.getMenuItems(menu)
      .then(menuItems => {
        menuItems.map(item => item.link = `/client/${item.link}`);
        resolve(menuItems)
      })
    })
  }

  private getMenuName(route : string){
    return route.split("/").filter(element => {
      if(element != "")
        return element;
    })[0];
  }
}
