import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuItem } from '../../../core/interfaces/menu-item';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuItems : Array<MenuItem>;

  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    private router : Router,
    private afauth : AngularFireAuth,
    private sidebarService : SidebarService
  ) { }

  ngOnInit(): void {
    this.sidebarService.menuItems
    .subscribe(menuItems => {
      this.menuItems = menuItems
    })
  }

  close(){
    this.toggle.emit(false);
  }

  navigateToMenu(){
    this.router.navigate(['/client/latest']);
  }


  logOut(){
    this.afauth.signOut();
  }
}
