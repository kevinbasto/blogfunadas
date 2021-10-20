import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CataloguesComponent } from './catalogues.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NewNovelFormComponent } from './new-novel-form/new-novel-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditNovelFormComponent } from './edit-novel-form/edit-novel-form.component';

const routes : Routes = [
  {
    path : '',
    component: CataloguesComponent
  },
  {
    path : 'new',
    component: NewNovelFormComponent
  },
  {
    path : ':novel',
    component: EditNovelFormComponent
  }
]

@NgModule({
  declarations: [
    CataloguesComponent,
    NewNovelFormComponent,
    EditNovelFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class CataloguesModule { }
