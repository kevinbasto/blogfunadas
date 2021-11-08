import { Injectable } from '@angular/core';
import { ChapterContent } from '../../../../core/interfaces/chapter.interface';
import { editChapterRepo } from '../../../../core/repos/chapters/edit-chapter';

@Injectable()
export class EditChapterService implements editChapterRepo{

  constructor() { }

  async editChapter(genre : string, novel : string, chapter : string, chapterContent : ChapterContent) : Promise<void> {
    try {
      
    } catch (error) {
      throw error;
    }
  }
}
