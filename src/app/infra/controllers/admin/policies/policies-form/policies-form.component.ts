import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Policies } from '../../../../../core/interfaces/terms.interface';

@Component({
  selector: 'app-policies-form',
  templateUrl: './policies-form.component.html',
  styleUrls: ['./policies-form.component.css']
})
export class PoliciesFormComponent implements OnInit {

  termsForm : FormGroup;

  @Output() termsData = new EventEmitter<Policies>();

  constructor(
    private builder : FormBuilder,
    private router : Router
  ) {
    this.termsForm = this.builder.group({
      date : [""],
      content : [""]
    })
  }

  ngOnInit(): void {
  }

  submit(){
    let terms : Policies = this.termsForm.value;
    this.termsData.emit(terms);
  }

  goBack(){
    this.router.navigate([`/admin/policies`]);
  }
}
