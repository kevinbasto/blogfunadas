import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { Novel } from '../../../../core/interfaces/novel.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { EditNovelRepo } from '../../../../core/repos/novels/edit-novel.repo';

@Injectable({
  providedIn: 'root'
})
export class EditNovelService implements EditNovelRepo{

  private cover : File;

  constructor(
    private firestore : AngularFirestore,
    private storage : AngularFireStorage
  ) { }

  editNovel( genre : string, novel : string, content : Novel ) : Promise<SystemMessage>{
    return new Promise<SystemMessage>(async(resolve, reject) => {
      try {
        this.cleanCover(content);
        content.cover = await this.checkCoverAndFetchUrl(genre, novel, content);
        await this.updateNovel(genre, novel, content)
        resolve({
          name  : "novel updated",
          message : "the novel has been successfully updated and you should see the results"
        })
      } catch (error) {
        reject(error);
      }
    });
  }

  cleanCover(content : Novel){
    if(content.coverFile){
      this.cover = content.coverFile
      delete content.coverFile;
    }
    return content;
  }

  private checkCoverAndFetchUrl(genre : string, novel : string, content : Novel) : Promise<string>{
    return new Promise<string>((resolve, reject) =>{
      try {
        if(!this.cover)
          resolve(content.cover);
        else
          this.uploadNewCover(genre, novel)
          .then((url : string) => resolve(url))
      } catch (error) {
        reject(error);
      }
    })
  }

  private uploadNewCover(genre : string, novel : string) : Promise<string>{
    return new Promise<string>(async(resolve, reject) => {
      let ref : AngularFireStorageReference = this.storage.ref(`/${genre}/${novel}/${this.cover.name}`);
      let task : AngularFireUploadTask = ref.put(this.cover);
      await task.snapshotChanges()
      .pipe(finalize(() => {
        ref.getDownloadURL().pipe(take(1)).toPromise()
        .then( (url : string) => resolve(url))
        .catch((error : any) => reject(error));
      })).toPromise();
    })
  }

  updateNovel(genre : string, novel : string, content : Novel) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc(`/${genre}/${novel}`).update(content)
      .then(() => resolve())
      .catch((err : any) => reject(err))
    });
  }
}
