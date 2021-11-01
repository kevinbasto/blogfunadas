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
      
      //update the chapters number in the novel
      await this.firestore.doc(`/${genre}/${novel}`).update({chapters : chapter.id});

      resolve({
        name: "chapter created",
        message: "the chapter has been successfully created"
      })
    });
  }
  
  getChapter( genre : string, novel : string, chapter : string ) : Promise<Chapter> {
    return new Promise<Chapter>((resolve, reject) => {
      console.log(`/${genre}/${novel}/${chapter}`);
      this.firestore.doc<Chapter>(`/${genre}/${novel}/chapters/${chapter}`).valueChanges().pipe(take(1)).toPromise()
      .then(res => resolve(res))
      .catch(err => reject(err));
    })
  }

  async updateChapter( genre : string, novel : string, chapter : string, content : Chapter ) : Promise<any> {
    return new Promise<SystemMessage>(async (resolve, reject) => {
      await this.firestore.doc(`/${genre}/${novel}/chapters/${chapter}`)
      .update(content)
      .catch(err => reject(err));
      resolve({
        name: "Chapter updated",
        message: "the chapter has been successfully updated without any issue"
      })
    })
  }

  async deleteChapter( genre : string, novel : string, chapterId : string ) : Promise<any> {
    await this.firestore.collection(genre).doc(novel).collection('chapters').doc(chapterId).delete()
    .catch(error => { throw new DatabaseException(error); });
  }
  
}
