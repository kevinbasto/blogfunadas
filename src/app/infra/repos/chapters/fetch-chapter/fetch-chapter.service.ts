import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Chapter } from '../../../../core/interfaces/chapter.interface';
import { FetchChapterRepo } from '../../../../core/repos/chapters/fetch-chapter';

@Injectable({
  providedIn: 'root'
})
export class FetchChapterService implements FetchChapterRepo{

  constructor(
    private firestore : AngularFirestore
  ) { }

  fetchChapter(genre : string, novel : string, chapter : string) : Promise<Chapter> {
    return new Promise<Chapter>((resolve, reject) => {
      this.firestore.doc<Chapter>(`/${genre}/${novel}/chapters/${chapter}`)
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then((chapter : Chapter) => resolve(chapter))
      .catch((error : any) => reject(error));
    })
  }
}
