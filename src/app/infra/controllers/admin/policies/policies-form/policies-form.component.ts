import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policies-form',
  templateUrl: './policies-form.component.html',
  styleUrls: ['./policies-form.component.css']
})
export class PoliciesFormComponent implements OnInit {

  termsForm : FormGroup;

  constructor(
    private builder : FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
