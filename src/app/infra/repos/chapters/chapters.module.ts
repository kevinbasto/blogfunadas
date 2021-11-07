import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CREATE_CHAPTER_REPO } from './chapters.tokens';
import { CreateChapterService } from './create-chapter/create-chapter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: CREATE_CHAPTER_REPO,
      useClass: CreateChapterService
    }
  ]
})
export class ChaptersModule { }
