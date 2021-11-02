import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../../../../../../core/interfaces/chapter.interface';
import { SystemMessage } from '../../../../../../core/interfaces/system-message';
import { ChaptersRepo } from '../../../../../../core/repos/chapters.repo';
import { CHAPTERS_REPO } from '../../../../../repos/tokens';

@Injectable({
  providedIn: 'root'
})
export class CreateChapterService {

  public genre : string;
  public novel : string;

  constructor(
    private router : Router,
    @Inject(CHAPTERS_REPO) private chaptersRepo : ChaptersRepo
  ) {
    let splitRoute = this.router.url.split("/");
    this.novel = splitRoute[splitRoute.length - 2];
    this.genre = splitRoute[splitRoute.length - 3];
  }

  submitChapter(chapter : Chapter) : Promise<SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      this.chaptersRepo.createChapter(this.genre, this.novel, chapter)
      .then(res => {
        this.router.navigate([`/admin/${this.genre}/${this.novel}`])
        resolve(res)
      })
      .catch(err => reject(err))
    })
  }

  goBack(){
    this.router.navigate([`/admin/${this.genre}/${this.novel}`]);
  }
}
