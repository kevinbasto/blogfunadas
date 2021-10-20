import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Novel } from '../../../../../core/interfaces/novel.interface';
import { Staff } from '../../../../../core/interfaces/staff';
import { User } from '../../../../../core/interfaces/user.interface';
import { NovelsRepo } from '../../../../../core/repos/novels.repo';
import { NOVELS_REPO } from '../../../../repos/tokens';

@Injectable({
  providedIn: 'root'
})
export class EditNovelFormService {
  constructor(
    @Inject(NOVELS_REPO) private novelsRepo: NovelsRepo,
    private firestore: AngularFirestore,
    private afauth : AngularFireAuth,
    private router : Router
  ) {}



  getStaff() : Promise<Array<Staff>>{
    return new Promise((resolve, reject) => {
      this.firestore
      .collection<User>('users', (fn) => fn.where('role', '!=', 'reader'))
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then((users) => {
        let staff : Array<Staff> = [];
        users.map(user => {
          staff.push({
            username: user.username,
            uid : user.url
          })
        })
        resolve(staff);
      })
      .catch((err) => {
        reject(err);
      });
    })
  }

  public getUid() : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.afauth.authState.pipe(take(1)).toPromise()
    .then(user => {
      resolve(user.uid);
    })
    })
  }

  getNovelData(genre  : string, novel : string) : Promise<Novel>{
    return new Promise<Novel>((resolve, reject) => {
      this.firestore.doc<Novel>(`/${genre}/${novel}`).valueChanges().pipe(take(1)).toPromise()
      .then(novel => resolve(novel))
      .catch(error => reject(error));
    });
  }

  editNovel(genre : string, novelId : string, novel : Novel){
    return new Promise<any>((resolve, reject) => {
      this.novelsRepo.updateNovel(genre, novelId, novel)
      .then(res => resolve(res))
      .catch(error => reject(error));
    })
  }
}
