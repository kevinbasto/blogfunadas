import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { Chapter, ChapterContent } from '../../../../core/interfaces/chapter.interface';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { CreateChapter } from '../../../../core/repos/chapters/create-chapter';

@Injectable()
export class CreateChapterService implements CreateChapter{

  public filesUploaded : Subject<number> = new Subject<number>();

  constructor(
    private firestore : AngularFirestore,
    private storage : AngularFireStorage
  ) { }

  async createChapter(genre : string, novel : string, chapter : ChapterContent) : Promise<SystemMessage>{
    try {
      chapter.chapter.url = await this.uploadText(genre, novel, chapter.chapter);
      let urls = await this.uploadFiles(genre, novel, chapter.chapter.url, chapter.files);
      let url : number = 0;
      for(let part of chapter.chapter.content){
        if(part.type == "image"){
          part.content = urls[url];
          url++;
        }
      }
      await this.updateChapter(genre, novel, chapter.chapter.url, chapter.chapter);
    } catch (error) {
      throw error;
    }
    return {
      name : "chapter uploaded",
      message: "the chapter was successfully uploaded"
    };
  }

  private async uploadText(genre : string, novel : string, chapter : Chapter) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection<Chapter>(`/${genre}/${novel}/chapters`).add(chapter)
      .then( (docRef : DocumentReference) => resolve(docRef.id))
      .catch( (error : any) => reject(error));
    })
  }

  private async uploadFiles(genre : string, novel : string, chapter : string, files : Array<File>) : Promise<Array<string>>{
    let uploadedFilesCount : number = 0;
    let urls : Array<string> = []
    for(let file of files){
      let ref : AngularFireStorageReference = this.storage.ref(`/${genre}/${novel}/${chapter}/${file.name}`)
      let task : AngularFireUploadTask = ref.put(file);
      await task.snapshotChanges()
      .pipe(finalize(() => {
        uploadedFilesCount++;
        this.filesUploaded.next((files.length / uploadedFilesCount) * 100);

        ref.getDownloadURL()
        .pipe(take(1)).toPromise()
        .then(url => urls.push(url))
        .catch(err => { throw err });
      }))
      .toPromise()
    }
    return urls;
  }

  private updateChapter(genre : string, novel : string, chapter : string, content : Chapter) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc(`/${genre}/${novel}/chapters/${chapter}`).update(content)
      .then(() => resolve())
      .catch(err => reject(err));
    })
  }
}
