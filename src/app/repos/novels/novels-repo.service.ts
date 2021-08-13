import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Novel } from '../../core/interfaces/novel.interface';
import { NovelsRepo } from '../../core/repos/novels.repo';

@Injectable()
export class NovelsRepoService implements NovelsRepo{

  constructor(
    private angularFirestore : AngularFirestore
  ) { }

  async createNovel( genre : string, novel : Novel ) : Promise<any> {
    await this.angularFirestore.collection(genre).add(novel)
    .catch(error => { throw error });
  }
  
  async getNovel( genre : string, novelId : string ) : Promise<Novel> {
    let novel : Novel
    this.angularFirestore.collection(genre).doc(novelId).valueChanges()
    .pipe(take(1)).toPromise()
    .then((res : any) => novel  = res)
    .catch(error => { throw error });
    return novel
  }

  async updateNovel( genre : string, novelId : string, novel : Novel ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novelId).update(novel)
    .catch(error => { throw error });
  }

  async deleteNovel( genre : string, novelId : string ) : Promise<any> {
    await this.angularFirestore.collection(genre).doc(novelId).delete()
    .catch(error => { throw error });
  }
  
  async getNovels( genre : string, page : number, pageSize : number ) : Promise<Array<Novel>> {
    let novels : Array<Novel>;
    await this.angularFirestore.collection(genre, ref => ref.startAt( ((page - 1) * pageSize) + 1).limit(page * pageSize))
    .valueChanges().pipe(take(1)).toPromise()
    .then( (res : any) => novels = res )
    .catch(error => { throw error });
    return novels;
  }
}
