import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../../../../core/interfaces/auth/login.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { Login } from '../../../../core/services/auth/login';
import { LoginServiceToken } from '../../../services/services.token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  public message : SystemMessage;
  public uploading : boolean;

  constructor(
    private formBuilder : FormBuilder,
    @Inject(LoginServiceToken) private loginService : Login,
    private router : Router
  ) {
    this.loginForm = this.formBuilder.group({
      email : ["", [ Validators.required, Validators.email ]],
      password : ["", [ Validators.required, Validators.minLength(8)]]
    });
    this.uploading = false;
  }

  ngOnInit(): void {
    
  }

  login(){
    this.uploading = true;
    this.loginService.emailLogin(this.loginData)
    .then( (res : SystemMessage) => this.message = res)
    .catch( (error : SystemMessage) => { console.log(error, "test"); this.message = error})
    .finally(() => this.ProcessAfterMessage())
  }

  ProcessAfterMessage(){
    setTimeout(() => {
      this.uploading = false;
      if(this.message.name == "success")
        this.router.navigate(["/client/latest"]);
      this.message = null;
    }, 1000);
  }

  get loginData() : LoginDto{
    return this.loginForm.value;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password () {
    return this.loginForm.get('password');
  }
}
