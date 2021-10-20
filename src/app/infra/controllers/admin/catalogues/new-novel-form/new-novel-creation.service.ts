import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Novel } from '../../../../../core/interfaces/novel.interface';
import { Staff } from '../../../../../core/interfaces/staff';
import { SystemMessage } from '../../../../../core/interfaces/system-message';
import { User } from '../../../../../core/interfaces/user.interface';
import { NovelsRepo } from '../../../../../core/repos/novels.repo';
import { NOVELS_REPO } from '../../../../repos/tokens';

@Injectable({
  providedIn: 'root',
})
export class NovelCreationService {
  constructor(
    @Inject(NOVELS_REPO) private novelsRepo: NovelsRepo,
    private firestore: AngularFirestore,
    private afauth : AngularFireAuth,
    private router : Router
  ) {}

  createNovel(genre: string, novel: Novel) : Promise<SystemMessage>{
    return new Promise<SystemMessage>((resolve, reject) => {
      this.novelsRepo.createNovel(genre, novel).then((res) => {
        resolve(res);
        this.router.navigate([`/admin/${genre}`]);
      });
    });
  }

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

}
