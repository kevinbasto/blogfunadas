import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { GenreFormComponent } from './genre-form/genre-form.component';
import { NovelFormComponent } from './novel-form/novel-form.component';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';
import { CommentFormComponent } from './comment-form/comment-form.component';



@NgModule({
  declarations: [DashboardComponent, TableComponent, UserFormComponent, GenreFormComponent, NovelFormComponent, ChapterFormComponent, CommentFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
