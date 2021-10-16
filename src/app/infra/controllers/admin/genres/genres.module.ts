import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './genres.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path : '',
    component: GenresComponent
  }
]

@NgModule({
  declarations: [
    GenresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GenresModule { }
