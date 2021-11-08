import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';
import { Chapter, ChapterContent, ChapterFile, Content } from '../../../../core/interfaces/chapter.interface';
import { editChapterRepo } from '../../../../core/repos/chapters/edit-chapter';

@Injectable()
export class EditChapterService implements editChapterRepo{

  private genre : string;
  private novel : string;
  private chapter : string

  constructor(
    private firestore : AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  async editChapter(genre : string, novel : string, chapter : string, chapterContent : ChapterContent) : Promise<void> {
    this.genre = genre;
    this.novel = novel;
    this.chapter = chapter;
    try {
      chapterContent.chapter.content = await this.uploadFilesAndUpdateContentUrls(chapterContent.files, chapterContent.chapter.content)
      this.setChapterContent(chapterContent.chapter)
    } catch (error) {
      throw error;
    }
    return;
  }

  private async uploadFilesAndUpdateContentUrls(files : Array<ChapterFile>, content : Array<Content>) : Promise<Array<Content>>{
    return new Promise<Array<Content>>(async(resolve, reject) => {
      try {
        for(let file of files){
          let url : string =  await this.uploadFileAndFetchUrl(file.file);
          content[file.index].content = url;
        }
        console.log(files);
        console.log(content);
        resolve(content)
      } catch (error) {
        reject(error);
      }
    });
  }

  private uploadFileAndFetchUrl( file : File) : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      let ref : AngularFireStorageReference = this.storage.ref(`/${this.genre}/${this.novel}/${this.chapter}/${file.name}`);
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

  private async setChapterContent(chapter : Chapter) : Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.firestore.doc(`/${this.genre}/${this.novel}/chapters/${this.chapter}`).update(chapter)
      .then(() => resolve())
      .catch(err => reject(err));
    })
  }
}
