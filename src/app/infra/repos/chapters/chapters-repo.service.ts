import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../../core/exceptions/database.exception';
import { Chapter } from '../../../core/interfaces/chapter.interface';
import { SystemMessage } from '../../../core/interfaces/system-message';
import { ChaptersRepo } from '../../../core/repos/chapters.repo';

@Injectable()
export class ChaptersRepoService implements ChaptersRepo{

  constructor(
    private firestore : AngularFirestore
  ) {}

  async createChapter( genre : string, novel : string, chapter : Chapter ) : Promise<SystemMessage> {
    return new Promise<SystemMessage>(async (resolve, reject) => {
      // fetch the meta data to assign a chapter id
      let meta : any = await this.firestore.doc(`/${genre}/${novel}/chapters/meta`).valueChanges().pipe(take(1)).toPromise()
      if(!meta)
        chapter.id = 1;
      else
        chapter.id = meta.size + 1;
      
      // write the new chapter
      let docRef : DocumentReference = await this.firestore.collection(`/${genre}/${novel}/chapters`).add(chapter)
      await this.firestore.doc(`/${genre}/${novel}/chapters/${docRef.id}`).update({ url : docRef.id });
      
      // update the meta data
      if(meta)
        await this.firestore.doc(`/${genre}/${novel}/chapters/meta`).update({size : chapter.id});
      else
        await this.firestore.doc(`/${genre}/${novel}/chapters/meta`).set({size : chapter.id});
      
      resolve({
        name: "chapter created",
        message: "the chapter has been successfully created"
      })
    });
  }
  
  async getChapter( genre : string, novel : string, chapterId : string ) : Promise<Chapter> {
    let chapter : Chapter;
    await this.firestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).valueChanges()
    .pipe(take(1)).toPromise()
    .then((res : any) => { chapter = res })
    .catch(error => { throw new DatabaseException(error); });
    return chapter;
  }

  async updateChapter( genre : string, novel : string, chapterId : string, chapter : Chapter ) : Promise<any> {
    await this.firestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).update(chapter)
    .catch(error => { throw new DatabaseException(error); });
  }

  async deleteChapter( genre : string, novel : string, chapterId : string ) : Promise<any> {
    await this.firestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).delete()
    .catch(error => { throw new DatabaseException(error); });
  }
  
}
