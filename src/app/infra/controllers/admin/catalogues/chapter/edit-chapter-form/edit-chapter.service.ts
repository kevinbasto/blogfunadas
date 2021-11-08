import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../../../../../../core/interfaces/chapter.interface';
import { SystemMessage } from '../../../../../../core/interfaces/system-message';
import { ChaptersRepo } from '../../../../../../core/repos/chapters.repo';
import { CHAPTERS_REPO } from '../../../../../repos/tokens';

@Injectable({
  providedIn: 'root'
})
export class EditChapterService {

  private genre : string;
  private novel : string;
  private chapter : string;

  constructor(
    @Inject(CHAPTERS_REPO) private chaptersRepo : ChaptersRepo,
    private router : Router
  ) {
    this.getConfigData();
  }

  getConfigData(){
    let urlTree : Array<string> = this.router.url.split("/");
    this.genre = urlTree[urlTree.length - 3];
    this.novel = urlTree[urlTree.length - 2];
    this.chapter = urlTree[urlTree.length - 1];
  }

  fetchChapterData() : Promise<Chapter>{
    return new Promise<Chapter>((resolve, reject) => {
      this.chaptersRepo.getChapter(this.genre, this.novel, this.chapter)
      .then(chapterFetched => resolve(chapterFetched))
      .catch(error => reject(error));
    });
  }

  updateData(chapter  : Chapter) : Promise<SystemMessage> {
    return new Promise<SystemMessage>((resolve, reject) => {
      this.chaptersRepo.updateChapter(this.genre, this.novel, this.chapter, chapter)
      .then(res => {
        resolve(res);
        this.router.navigate([`/admin/${this.genre}/${this.novel}`]);
      })
      .catch(err => reject(err));
    })
  }

  goback(){
    this.router.navigate([`/admin/${this.genre}/${this.novel}`]);
  }
}
