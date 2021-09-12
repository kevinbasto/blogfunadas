import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '../../core/interfaces/auth/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) { 
    this.registerForm = this.formBuilder.group({
      email : ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword : ["", [Validators.required, Validators.minLength(8)]],
      terms : [null, [Validators.requiredTrue]]
    })
  }

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerData);
  }

  get registerData() : RegisterDto{
    return this.registerForm.value;
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }
}
