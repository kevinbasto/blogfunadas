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
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { TermsFormComponent } from './terms-form/terms-form.component';
import { PrivacyFormComponent } from './privacy-form/privacy-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent,
    UserFormComponent,
    GenreFormComponent,
    NovelFormComponent,
    ChapterFormComponent,
    CommentFormComponent,
    TermsFormComponent,
    PrivacyFormComponent,
  ],
  imports: [
    CommonModule, 
    AdminRoutingModule,

    // material imports
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class AdminModule {}
