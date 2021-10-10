import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServicetoken, LoginServiceToken, RecoverServiceToken, RegisterServiceToken, SidebarServiceToken } from './services.token';
import { LoginService } from './auth-related/login/login.service';
import { AuthService } from './auth-related/auth/auth.service';
import { RegisterService } from './auth-related/register/register.service';
import { ReposModule } from '../repos/repos.module';
import { RecoverService } from './auth-related/recover/recover.service';
import { SidebarService } from './sidebar/sidebar.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReposModule,
    RouterModule
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
    },
    {
      provide: SidebarServiceToken,
      useClass: SidebarService
    }
  ]
})
export class ServicesModule { }
