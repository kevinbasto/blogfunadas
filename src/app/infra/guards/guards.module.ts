import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { ServicesModule } from '../services/services.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule
  ],
  providers : [
    AuthGuard
  ]
})
export class GuardsModule { }
