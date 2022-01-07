import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Terms } from '../../../../../core/interfaces/terms.interface';

@Component({
  selector: 'app-policies-form',
  templateUrl: './policies-form.component.html',
  styleUrls: ['./policies-form.component.css']
})
export class PoliciesFormComponent implements OnInit {

  termsForm : FormGroup;

  @Output() termsData = new EventEmitter<Terms>();

  constructor(
    private builder : FormBuilder
  ) {
    this.termsForm = this.builder.group({
      date : [""],
      content : [""]
    })
  }

  ngOnInit(): void {
  }

  submit(){
    let terms : Terms = this.termsForm.value;
    this.termsData.emit(terms);
  }
}
