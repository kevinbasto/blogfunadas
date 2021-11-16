import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { Chapter, ChapterContent, ChapterFile } from '../../../../core/interfaces/chapter.interface';
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
      chapter.chapter.id = await this.getId(genre, novel);
      chapter.chapter.url = await this.uploadText(genre, novel, chapter.chapter);
      console.log(chapter.chapter);
      let urls = await this.uploadFiles(genre, novel, chapter.chapter.url, chapter.files)
      let url : number = 0;
      for(let part of chapter.chapter.content){
        if(part.type == "image"){
          part.content = urls[url];
          url++;
        }
      }
      await this.updateChapter(genre, novel, chapter.chapter.url, chapter.chapter);
      await this.updateMeta(genre, novel, chapter.chapter.id);
      await this.updateChapterCount(genre, novel, chapter.chapter.id)
    } catch (error) {
      console.log(error);
      throw error;
    }
    return {
      name : "chapter uploaded",
      message: "the chapter was successfully uploaded"
    };
  }

  private async getId(genre : string, novel : string): Promise<number>{
    let id : number;
    await this.firestore.doc(`/${genre}/${novel}/chapters/meta`)
    .valueChanges().pipe(take(1)).toPromise()
    .then((meta : any) => id = meta? meta.size + 1 : 1)
    .catch(err => { console.log(err); throw err});
    console.log(id);
    return id;
  }

  private async uploadText(genre : string, novel : string, chapter : Chapter) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection<Chapter>(`/${genre}/${novel}/chapters`).add(chapter)
      .then( (docRef : DocumentReference) => resolve(docRef.id))
      .catch( (error : any) => { console.log(error); reject(error)});
    })
  }

  private async uploadFiles(genre : string, novel : string, chapter : string, files : Array<ChapterFile>) : Promise<Array<string>>{
    let uploadedFilesCount : number = 0;
    let urls : Array<string> = []
    for(let file of files){
      let url = await this.uploadFileAndFetchUrl(genre, novel, chapter, file.file)
      uploadedFilesCount++;
      this.filesUploaded.next((uploadedFilesCount / files.length) * 100);
      urls.push(url);
    }
    console.log(urls);
    return urls;
  }

  private uploadFileAndFetchUrl(genre : string, novel : string, chapter : string, file : File) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      let ref : AngularFireStorageReference = this.storage.ref(`/${genre}/${novel}/${chapter}/${file.name}`);
      let task : AngularFireUploadTask = ref.put(file);
      task.snapshotChanges()
      .pipe(finalize(() => {
        ref.getDownloadURL()
        .pipe(take(1))
        .toPromise()
        .then((url : string) => resolve(url))
        .catch(err => reject(err));
      }))
      .toPromise();
    })
  }

  private updateChapter(genre : string, novel : string, chapter : string, content : Chapter) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      console.log(content);
      this.firestore.doc(`/${genre}/${novel}/chapters/${chapter}`).update(content)
      .then(() => resolve())
      .catch(err => { console.log(err); reject(err)});
    })
  }

  private updateMeta(genre : string, novel : string, id : number) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc(`/${genre}/${novel}/chapters/meta`).update({ size : id})
      .catch(error => { console.log(error); reject(error)});
      resolve()
    })
  }

  private async updateChapterCount(genre : string, novel : string, id : number) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc(`/${genre}/${novel}`).update({chapters : id})
      .then(res => { console.log("done"); resolve()})
      .catch(err => { console.log(err); reject(err)});
    })
  }
}
