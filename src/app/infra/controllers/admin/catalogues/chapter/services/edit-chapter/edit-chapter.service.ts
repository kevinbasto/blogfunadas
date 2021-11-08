import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChapterContent } from '../../../../../../../core/interfaces/chapter.interface';
import { SystemMessage } from '../../../../../../../core/interfaces/system-message';
import { editChapterRepo } from '../../../../../../../core/repos/chapters/edit-chapter';
import { EDIT_CHAPTER_REPO } from '../../../../../../repos/chapters/chapters.tokens';

@Injectable({
  providedIn: 'root'
})
export class EditChapterService {

  private  genre   : string;
  private  novel   : string;
  private  chapter : string;

  constructor(
    @Inject(EDIT_CHAPTER_REPO) private editChapterRepo : editChapterRepo,
    private router : Router
  ) {
    this.setChapterData();
  }

  editChapter(chapter :ChapterContent) : Promise<SystemMessage>{
    return new Promise<SystemMessage>(async(resolve, reject) => {
      this.editChapterRepo.editChapter(this.genre, this.novel, this.chapter, chapter)
      .then(() => {
        resolve({ name : "updated chapter", message: "the chapter was updated successfully"})
        this.router.navigate([`/admin/${this.genre}/${this.novel}`])
      })
      .catch(err => reject(err));
    })
  }

  setChapterData(){
    let parseTree :  Array<string> = this.router.url.split("/");
    this.genre   = parseTree[parseTree.length - 3];
    this.novel   = parseTree[parseTree.length - 2];
    this.chapter = parseTree[parseTree.length - 1];
  }
}
