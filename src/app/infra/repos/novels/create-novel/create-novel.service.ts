import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { Novel } from '../../../../core/interfaces/novel.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { CreateNovelRepo } from '../../../../core/repos/novels/create-novel.repo';

@Injectable({
  providedIn: 'root'
})
export class CreateNovelService implements CreateNovelRepo{

  private cover : File;

  constructor(
    private firestore : AngularFirestore,
    private storage : AngularFireStorage
  ) { }

  SaveNewNovel( genre : string, novel : Novel ) : Promise<SystemMessage>{
    return new Promise<SystemMessage>(async(resolve, reject) => {
      try {
        if(novel.coverFile){
          this.cover = novel.coverFile;
          delete novel.coverFile
        }
        novel.url = await this.saveNovelAndFetchId(genre, novel);
        novel.cover = await this.uploadCover(genre, novel.url);
        novel.id = await this.updateMetaAndFetchId(genre);
        await this.updateNovel(genre, novel.url, novel);
        resolve({
          name : "novel created",
          message : "the novel has been successfully and indexed"
        })
      } catch (error) {
        reject(error)
      }
    });
  }

  private saveNovelAndFetchId(genre : string, novel : Novel) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection(genre).add(novel)
      .then((docRef : DocumentReference) => resolve(docRef.id))
      .catch((error : any) => reject(error));
    })
  }

  private uploadCover(genre : string, novelId : string) : Promise<string>{
    return new Promise<string>(async (resolve, reject) => {
      try {
        if(!this.cover)
          resolve(null);
        let ref : AngularFireStorageReference = this.storage.ref(`/${genre}/${novelId}/${this.cover.name}`)
        let task : AngularFireUploadTask = ref.put(this.cover);
        await task.snapshotChanges()
        .pipe(finalize(() => {
          ref.getDownloadURL().pipe(take(1)).toPromise()
          .then(url => resolve(url))
          .catch(error => reject(error));
        })).toPromise();
      } catch (error) {
        reject(error)
      }
    })
  }

  private updateMetaAndFetchId(genre : string) : Promise<number>{
    return new Promise<number>(async(resolve, reject) => {
      try {
        let id : number;
        await this.firestore.doc(`/${genre}/meta`).valueChanges().pipe(take(1)).toPromise()
        .then((meta : any) => id = meta? meta.size + 1 : 1)
        await this.firestore.doc(`/${genre}/meta`).update({ size : id});
        resolve(id);
      } catch (error) {
        reject(error);
      }
    })
  }

  private updateNovel(genre : string, novelId : string, novel : Novel) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.firestore.doc(`/${genre}/${novelId}`).update(novel)
      .then(() => resolve(true))
      .catch(err => reject(err));
    })
  }
}
