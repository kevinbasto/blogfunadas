import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CataloguesComponent } from './catalogues.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NovelFormComponent } from './novel-form/novel-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const routes : Routes = [
  {
    path : '',
    component: CataloguesComponent
  },
  {
    path : ':novel',
    component: NovelFormComponent
  }
]

@NgModule({
  declarations: [
    CataloguesComponent,
    NovelFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class CataloguesModule { }
