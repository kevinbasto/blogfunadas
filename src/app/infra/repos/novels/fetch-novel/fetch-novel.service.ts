import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Novel } from '../../../../core/interfaces/novel.interface';
import { FetchNovelRepo } from '../../../../core/repos/novels/fetch-novel.repo';

@Injectable()
export class FetchNovelService implements FetchNovelRepo{

  constructor(
    private firestore : AngularFirestore
  ) { }

  fetchNovel(genre : string, novel : string) : Promise<Novel>{
    return new Promise<Novel>((resolve, reject) => {
      this.firestore.doc<Novel>(`/${genre}/${novel}`)
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(res => resolve(res))
      .catch(err => reject(err));
    })
  }
}
