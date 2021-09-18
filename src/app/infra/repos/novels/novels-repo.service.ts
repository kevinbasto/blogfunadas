import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { DatabaseException } from '../../../core/exceptions/database.exception';
import { Novel } from '../../../core/interfaces/novel.interface';
import { NovelsRepo } from '../../../core/repos/novels.repo';

@Injectable()
export class NovelsRepoService implements NovelsRepo{

  constructor(
    private angularFirestore : AngularFirestore
  ) { }

  async createNovel( genre : string, novel : Novel ) : Promise<any> {
    let id : string;
    await this.angularFirestore.collection(genre).add(novel)
    .then( (res : DocumentReference) => id = res.id)
    .catch(error => { throw new DatabaseException(error); });
    return id;
  }
  
  async getNovel( genre : string, novelId : string ) : Promise<Novel> {
    let novel : Novel
    await this.angularFirestore.collection(genre).doc(novelId).valueChanges()
    .pipe(take(1)).toPromise()
    .then((res : any) => novel = res)
    .catch(error => { throw new DatabaseException(error); });
    return novel
  }

  async updateNovel( genre : string, novelId : string, novel : Novel ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novelId).update(novel)
    .catch(error => { throw new DatabaseException(error); });
  }

  async deleteNovel( genre : string, novelId : string ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novelId).delete()
    .catch(error => { throw new DatabaseException(error); });
  }
  
  async getNovels( genre : string, page : number, pageSize : number ) : Promise<Array<Novel>> {
    let novels : Array<Novel>;
    await this.angularFirestore.collection(genre, ref => ref.startAt( ((page - 1) * pageSize) + 1).limit(page * pageSize))
    .valueChanges().pipe(take(1)).toPromise()
    .then( (res : any) => novels = res )
    .catch(error => { throw new DatabaseException(error); });
    return novels;
  }
}
