import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CataloguesComponent } from './catalogues.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NewNovelFormComponent } from './novel/new-novel-form/new-novel-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditNovelFormComponent } from './novel/edit-novel-form/edit-novel-form.component'; 
import { GuardsModule } from '../../../guards/guards.module';
import { TranslaterGuard } from '../../../guards/translater/translater.guard';
import { NewChapterFormComponent } from './chapter/new-chapter-form/new-chapter-form.component';
import { EditChapterFormComponent } from './chapter/edit-chapter-form/edit-chapter-form.component'; 
import { DirectivesModule } from '../../../directives/directives.module';
import { NovelFormComponent } from './novel/novel-form/novel-form.component';

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
    component: EditNovelFormComponent,
    canActivate: [TranslaterGuard]
  },
  {
    path: ':novel/new',
    component: NewChapterFormComponent,
    canActivate: [TranslaterGuard]
  },
  {
    path: ':novel/:chapter',
    component: EditChapterFormComponent,
    canActivate: [TranslaterGuard]
  }
]

@NgModule({
  declarations: [
    CataloguesComponent,
    NewNovelFormComponent,
    EditNovelFormComponent,
    NewChapterFormComponent,
    EditChapterFormComponent,
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
    MatSelectModule,
    MatProgressSpinnerModule,
    GuardsModule,
    DirectivesModule
  ]
})
export class CataloguesModule { }
