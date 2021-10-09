import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    private router : Router,
    private afauth : AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.toggle.emit(false);
  }

  navigateToMenu(){
    this.router.navigate(['/auth/latest']);
  }


  logOut(){
    this.afauth.signOut();
  }
}
