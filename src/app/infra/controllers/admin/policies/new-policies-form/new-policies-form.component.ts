import { Component, OnInit } from '@angular/core';
import { Terms } from '../../../../../core/interfaces/terms.interface';

@Component({
  selector: 'app-new-policies-form',
  templateUrl: './new-policies-form.component.html',
  styleUrls: ['./new-policies-form.component.css']
})
export class NewPoliciesFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(data : Terms){
    console.log(data);
  }
}
