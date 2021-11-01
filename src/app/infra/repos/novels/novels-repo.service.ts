import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../../core/exceptions/database.exception';
import { Novel } from '../../../core/interfaces/novel.interface';
import { SystemMessage } from '../../../core/interfaces/system-message';
import { NovelsRepo } from '../../../core/repos/novels.repo';

@Injectable()
export class NovelsRepoService implements NovelsRepo {
  constructor(private angularFirestore: AngularFirestore) {}

  /**
   * this functions create a new novel
   * 1. get the id
   * 2. set the new novelId
   * 3. update the genre size
   * 4. return a success Message
   * @param genre 
   * @param novel 
   * @returns 
   */
  createNovel(genre: string, novel: Novel) : Promise<SystemMessage> {
    return new Promise<any>(async (resolve, reject) => {
      novel.id = await this.getId(genre);
      try{
        await this.addNovel(genre, novel);
        await this.updateGenreMeta(genre, novel.id);
        resolve({
          name : "Novela creada",
          message : "¡La novela ha sido creada con éxito!"
        })
      }catch(err){
        reject(err);
      }
    });
  }

  private getId(genre : string) : Promise<number>{
    return new Promise<number>((resolve, reject) => {
      this.angularFirestore.collection<Novel>(genre, fn => fn.orderBy('id', 'desc').limit(1)).valueChanges().pipe(take(1)).toPromise()
      .then((result) => resolve(result[0]? result[0].id + 1 : 1))
      .catch(err => reject(err));
    })
  }

  private async addNovel(genre : string, novel : Novel){
    await this.angularFirestore.collection(genre).add(novel)
    .then(docRef => {
      this.angularFirestore.collection(genre).doc(docRef.id).update({ url : docRef.id});
    })
    .catch(err => { throw err });
  }

  private async updateGenreMeta(genre : string, id : number) {
    await this.angularFirestore.collection(genre).doc('meta').update({size : id})
    .catch(err => { throw err });
  }

  async getNovel(genre: string, novelId: string): Promise<Novel> {
    let novel: Novel;
    await this.angularFirestore
      .collection(genre)
      .doc<Novel>(novelId)
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(res => (novel = res))
      .catch((error) => {
        throw new DatabaseException(error);
      });
    return novel;
  }

  async updateNovel(
    genre: string,
    novelId: string,
    novel: Novel
  ): Promise<any> {
    await this.angularFirestore
      .collection(genre)
      .doc(novelId)
      .update(novel)
      .catch((error) => {
        throw new DatabaseException(error);
      });
  }

  async deleteNovel(genre: string, novelId: string): Promise<any> {
    await this.angularFirestore
      .collection(genre)
      .doc(novelId)
      .delete()
      .catch((error) => {
        throw new DatabaseException(error);
      });
      return true;
  }

  async getNovels(
    genre: string,
    page: number,
    pageSize: number
  ): Promise<Array<Novel>> {
    let novels: Array<Novel>;
    await this.angularFirestore
      .collection(genre, (ref) =>
        ref.startAt((page - 1) * pageSize + 1).limit(page * pageSize)
      )
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then((res: any) => (novels = res))
      .catch((error) => {
        throw new DatabaseException(error);
      });
    return novels;
  }
}
