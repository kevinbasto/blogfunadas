import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.toggle.emit(true);
  }

  
}
