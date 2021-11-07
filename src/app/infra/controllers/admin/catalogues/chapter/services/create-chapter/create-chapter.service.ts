import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ChapterContent } from '../../../../../../../core/interfaces/chapter.interface';
import { CreateChapter } from '../../../../../../../core/repos/chapters/create-chapter';
import { CREATE_CHAPTER_REPO } from '../../../../../../repos/chapters/chapters.tokens';

@Injectable({
  providedIn: 'root'
})
export class CreateChapterService {

  public genre : string;
  public novel : string;

  constructor(
    private router : Router,
    @Inject(CREATE_CHAPTER_REPO) private CreateChapter : CreateChapter
  ) {
    let splitRoute = this.router.url.split("/");
    this.novel = splitRoute[splitRoute.length - 2];
    this.genre = splitRoute[splitRoute.length - 3];
  }

  uploadChapter(chapterContent : ChapterContent){
    this.CreateChapter.createChapter(this.genre, this.novel, chapterContent)
    .then(res => console.log(res))
    .catch(error => console.log(error));
    this.CreateChapter.filesUploaded
    .pipe(finalize(() => { this.CreateChapter.filesUploaded.unsubscribe()}))
    .subscribe(percentage => { console.log(`${percentage}% uploaded`);})
  }

  goBack(){
    this.router.navigate([`/admin/${this.genre}/${this.novel}`]);
  }
}
