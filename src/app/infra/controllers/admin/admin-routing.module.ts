import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { GenreFormComponent } from './genre-form/genre-form.component';
import { NovelFormComponent } from './novel-form/novel-form.component';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { TermsFormComponent } from './terms-form/terms-form.component';
import { PrivacyFormComponent } from './privacy-form/privacy-form.component';

const routes : Routes = [
  {
    path : '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component : DashboardComponent
  },
  {
    path: ':table',
    component: TableComponent
  },
  {
    path : ':table/user/:user',
    component: UserFormComponent
  },
  {
    path: ':table/genre/:genre',
    component: GenreFormComponent
  },
  {
    path: ':table/novel/:novel',
    component: NovelFormComponent
  },
  {
    path: ':table/novel/:novel/:chapter',
    component: ChapterFormComponent
  },
  {
    path: ':table/reports/:comment',
    component: CommentFormComponent
  },
  {
    path : ':table/terms/:terms',
    component: TermsFormComponent
  },
  {
    path : ':table/privacy/:privacy',
    component: PrivacyFormComponent
  },
  {
    path : '**',
    redirectTo: 'dashboard'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
