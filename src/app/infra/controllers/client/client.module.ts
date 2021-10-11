import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { CataloguesComponent } from './catalogues/catalogues.component';
import { NovelComponent } from './novel/novel.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ProfileComponent } from './profile/profile.component';
import { ReposModule } from '../../repos/repos.module';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [ 
    CataloguesComponent, 
    NovelComponent, 
    ChapterComponent, 
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReposModule,
    ComponentsModule
  ]
})
export class ClientModule { }
