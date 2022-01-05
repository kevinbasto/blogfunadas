import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from '../../../components/components.module';
import { PoliciesFormComponent } from './policies-form/policies-form.component';
import { NewPoliciesFormComponent } from './new-policies-form/new-policies-form.component';
import { EditPoliciesFormComponent } from './edit-policies-form/edit-policies-form.component';

const routes : Routes = [
  {
    path: '',
    component: PoliciesComponent
  },
  {
    path: 'new',
    component: NewPoliciesFormComponent
  },
  {
    path: ':id',
    component: EditPoliciesFormComponent
  }
]

@NgModule({
  declarations: [
    PoliciesComponent,
    PoliciesFormComponent,
    NewPoliciesFormComponent,
    EditPoliciesFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    ComponentsModule
  ]
})
export class PoliciesModule { }
