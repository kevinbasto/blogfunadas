import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginServiceToken } from './services.token';
import { LoginService } from './login/login.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  providers: [
    {
      provide: LoginServiceToken,
      useClass: LoginService
    }
  ]
})
export class ServicesModule { }
