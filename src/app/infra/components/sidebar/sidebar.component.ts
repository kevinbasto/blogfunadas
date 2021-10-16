import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { Sidebar } from '../../../core/services/sidebar';
import { SidebarServiceToken } from '../../services/services.token';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems : Array<MenuItem>;

  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    @Inject(SidebarServiceToken) private sidebar : Sidebar
  ) { 
    this.sidebar.menuItems.subscribe( (menuItems : Array<MenuItem>) => {
      this.menuItems = menuItems;
    });
  }

  ngOnInit(): void { }

  close(){
    this.toggle.emit(false);
  }

  navigateToMenu(){
    this.sidebar.navigateToMenu();
  }

  signOut(){
    this.sidebar.signOut();
  }
}
