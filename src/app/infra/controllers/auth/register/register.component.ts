import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegisterDto } from '../../../../core/interfaces/auth/register.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { Register } from '../../../../core/services/auth/register';
import { checkPasswords, PasswordErrorStateMatcher } from '../../../../core/validations/password.validation';
import { RegisterServiceToken } from '../../../services/services.token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm : FormGroup;
  public matcher : ErrorStateMatcher = new PasswordErrorStateMatcher();
  public hide : boolean;
  public message : SystemMessage;
  public messageClass : string;

  constructor(
    private formBuilder : FormBuilder,
    @Inject(RegisterServiceToken) private registerService: Register,
    private router: Router
  ) { 
    this.registerForm = this.formBuilder.group({
      username : ["", [Validators.required]],
      email : ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword : ["", [Validators.required, Validators.minLength(8)]],
      terms : [null, [Validators.requiredTrue]]
    }, { validators : checkPasswords })
    this.hide = true;
  }

  ngOnInit(): void {
  }

  register(){
    let registerData = this.registerForm.value;
    delete registerData.terms;
    this.registerService.emailRegister(registerData)
    .then((result) => {
      this.message = result;
      this.messageClass = "success"
      this.router.navigate(['/auth/login']);
    }).catch((err) => {
      console.log(err);
      this.message = err;
      this.messageClass = "failure"
    }).finally(() => {
      setTimeout(() => {
        this.message = null;
        this.messageClass = null;
      }, 1000);
    })
  }

  get registerData(){
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
