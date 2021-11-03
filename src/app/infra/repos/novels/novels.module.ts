import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CREATE_NOVEL_REPO, EDIT_NOVEL_REPO, FETCH_NOVEL_REPO } from './novels.tokens';
import { CreateNovelService } from './create-novel/create-novel.service';
import { FetchNovelService } from './fetch-novel/fetch-novel.service';
import { EditNovelService } from './edit-novel/edit-novel.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: CREATE_NOVEL_REPO,
      useClass: CreateNovelService
    },
    {
      provide: FETCH_NOVEL_REPO,
      useClass: FetchNovelService
    },
    {
      provide: EDIT_NOVEL_REPO,
      useClass: EditNovelService
    }
  ]
})
export class NovelsModule { }
