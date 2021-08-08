import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Login } from '../../core/interfaces/auth/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email : ["", [ Validators.required, Validators.email ]],
      password : ["", [ Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginData);
  }

  get loginData() : Login{
    return this.loginForm.value;
  }
}
