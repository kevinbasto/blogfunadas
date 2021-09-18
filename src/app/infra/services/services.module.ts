import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServicetoken, LoginServiceToken, RegisterServiceToken } from './services.token';
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';
import { RegisterService } from './register/register.service';
import { ReposModule } from '../repos/repos.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReposModule
  ],
  providers: [
    {
      provide: LoginServiceToken,
      useClass: LoginService
    },
    {
      provide: AuthServicetoken,
      useClass: AuthService
    },
    {
      provide: RegisterServiceToken,
      useClass: RegisterService
    }
  ]
})
export class ServicesModule { }
