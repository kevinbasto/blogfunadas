import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  toggle : boolean;
  opened : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(value : boolean){
    this.toggle = value;
  }

  

  close(){
    this.toggle = false;
  }

}
