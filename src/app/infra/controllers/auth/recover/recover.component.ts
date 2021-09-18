import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  public recoverForm : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) {
    this.recoverForm = this.formBuilder.group({
      email : ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.email.value);
  }

  get email(){
    return this.recoverForm.get('email');
  }
}
