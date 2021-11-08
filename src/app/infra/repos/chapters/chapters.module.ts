import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CREATE_CHAPTER_REPO, EDIT_CHAPTER_REPO, FETCH_CHAPTER_REPO } from './chapters.tokens';
import { CreateChapterService } from './create-chapter/create-chapter.service';
import { FetchChapterService } from './fetch-chapter/fetch-chapter.service';
import { EditChapterService } from './edit-chapter/edit-chapter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: CREATE_CHAPTER_REPO,
      useClass: CreateChapterService
    },
    {
      provide: FETCH_CHAPTER_REPO,
      useClass: FetchChapterService
    },
    {
      provide: EDIT_CHAPTER_REPO,
      useClass: EditChapterService
    }
  ]
})
export class ChaptersModule { }
