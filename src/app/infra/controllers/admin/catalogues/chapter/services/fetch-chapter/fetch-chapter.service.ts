import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../../../../../../../core/interfaces/chapter.interface';
import { FetchChapterRepo } from '../../../../../../../core/repos/chapters/fetch-chapter';
import { FETCH_CHAPTER_REPO } from '../../../../../../repos/chapters/chapters.tokens';

@Injectable({
  providedIn: 'root'
})
export class FetchChapterService {

  private genre : string;
  private novel : string;
  private chapter : string;

  constructor(
    @Inject(FETCH_CHAPTER_REPO) private fetchChapterService : FetchChapterRepo,
    private router : Router
  ) {
    this.setChapterData();
  }

  fetchChapter() : Promise<Chapter>{
    return new Promise<Chapter>((resolve, reject) => {
      this.fetchChapterService.fetchChapter(this.genre, this.novel, this.chapter)
      .then((chapter : Chapter) => resolve(chapter))
      .catch((error : any) => reject(error) );
    });
  }

  setChapterData(){
    let parseTree :  Array<string> = this.router.url.split("/");
    this.genre = parseTree[parseTree.length - 3];
    this.novel = parseTree[parseTree.length - 2];
    this.chapter = parseTree[parseTree.length - 1];
  }

  goBack(){
    this.router.navigate([`/admin/${this.genre}/${this.novel}`])
  }
}
