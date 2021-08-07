import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CataloguesComponent } from './catalogues/catalogues.component';
import { NovelComponent } from './novel/novel.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ProfileComponent } from './profile/profile.component';

const routes : Routes = [
  {
    path: '',
    redirectTo: 'latest',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: ':catalogue',
    component: CataloguesComponent
  },
  {
    path: ':catalogue/:novel',
    component: NovelComponent
  },
  {
    path: ':catalogue/:novel/:chapter',
    component: ChapterComponent
  },
  
  {
    path: '**',
    redirectTo: 'latest'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientRoutingModule { }
