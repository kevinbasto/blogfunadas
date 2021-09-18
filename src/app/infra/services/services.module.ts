import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServicetoken, LoginServiceToken, RecoverServiceToken, RegisterServiceToken } from './services.token';
import { LoginService } from './auth-related/login/login.service';
import { AuthService } from './auth-related/auth/auth.service';
import { RegisterService } from './auth-related/register/register.service';
import { ReposModule } from '../repos/repos.module';
import { RecoverService } from './auth-related/recover/recover.service';



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
    },
    {
      provide: RecoverServiceToken,
      useClass: RecoverService
    }
  ]
})
export class ServicesModule { }
