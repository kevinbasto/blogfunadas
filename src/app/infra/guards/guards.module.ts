import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';
import { NonAuthGuard } from './non-auth/non-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { AdminGuard } from './roles/admin/admin.guard';
import { TranslaterGuard } from './translater/translater.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule,
    RouterModule
  ],
  providers : [
    AuthGuard,
    NonAuthGuard,
    RolesGuard,
    AdminGuard,
    TranslaterGuard
  ]
})
export class GuardsModule { }
