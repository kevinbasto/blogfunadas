import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule,
    RouterModule
  ],
  providers : [
    AuthGuard
  ]
})
export class GuardsModule { }
