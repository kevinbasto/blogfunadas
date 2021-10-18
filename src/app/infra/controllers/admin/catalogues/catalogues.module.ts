import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CataloguesComponent } from './catalogues.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes : Routes = [
  {
    path : '',
    component: CataloguesComponent
  }
]

@NgModule({
  declarations: [
    CataloguesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CataloguesModule { }
