import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServicetoken, LoginServiceToken } from './services.token';
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  providers: [
    {
      provide: LoginServiceToken,
      useClass: LoginService
    },
    {
      provide: AuthServicetoken,
      useClass: AuthService
    }
  ]
})
export class ServicesModule { }
