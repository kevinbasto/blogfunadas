import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Chapter } from '../../core/interfaces/chapter.interface';
import { ChaptersRepo } from '../../core/repos/chapters.repo';

@Injectable()
export class ChaptersRepoService implements ChaptersRepo{

  constructor(
    private angularFirestore : AngularFirestore
  ) {}

  async createChapter( genre : string, novel : string, chapterId : string, chapter : Chapter ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).set(chapter)
    .catch(error => { throw error });
  }
  
  async getChapter( genre : string, novel : string, chapterId : string ) : Promise<Chapter> {
    let chapter : Chapter;
    await this.angularFirestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).valueChanges()
    .pipe(take(1)).toPromise()
    .then((res : any) => { chapter = res })
    .catch(error => { throw new error });
    return chapter;
  }

  async updateChapter( genre : string, novel : string, chapterId : string, chapter : Chapter ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).update(chapter)
    .catch(error => { throw error });
  }

  async deleteChapter( genre : string, novel : string, chapterId : string ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).delete()
    .catch(error => { throw error });
  }
  
}
