import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Novel } from '../../../../../../../core/interfaces/novel.interface';
import { FetchNovelRepo } from '../../../../../../../core/repos/novels/fetch-novel.repo';
import { FETCH_NOVEL_REPO } from '../../../../../../repos/novels/novels.tokens';

@Injectable({
  providedIn: 'root'
})
export class FetchNovelService {

  constructor(
    @Inject(FETCH_NOVEL_REPO) private fetchNovelService : FetchNovelRepo
  ) { }

  getNovel(genre : string, novelId : string) : Promise<Novel>{
    return new Promise<Novel>((resolve, reject) => {
      this.fetchNovelService.fetchNovel(genre, novelId)
      .then((novel : Novel) => resolve(novel))
      .catch((err : any) => reject(err))
    })
  }
}
