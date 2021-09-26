import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() toggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.toggle.emit(false);
  }

}
