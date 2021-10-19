import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './genres.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NewGenreFormComponent } from './new-genre-form/new-genre-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  {
    path : '',
    component: GenresComponent
  },
  {
    path : 'new',
    component: NewGenreFormComponent
  }
]

@NgModule({
  declarations: [
    GenresComponent,
    NewGenreFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class GenresModule { }
