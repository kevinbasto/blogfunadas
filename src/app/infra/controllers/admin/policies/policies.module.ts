import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from '../../../components/components.module';
import { PoliciesFormComponent } from './policies-form/policies-form.component';
import { NewPoliciesFormComponent } from './new-policies-form/new-policies-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const routes : Routes = [
  {
    path: '',
    component: PoliciesComponent
  },
  {
    path: 'new',
    component: NewPoliciesFormComponent
  }
]

@NgModule({
  declarations: [
    PoliciesComponent,
    PoliciesFormComponent,
    NewPoliciesFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class PoliciesModule { }
