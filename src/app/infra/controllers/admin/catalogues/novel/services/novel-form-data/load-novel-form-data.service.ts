import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Staff } from '../../../../../../../core/interfaces/staff';
import { User } from '../../../../../../../core/interfaces/user.interface';
import { AuthService } from '../../../../../../services/auth-related/auth/auth.service';
import { AuthServicetoken } from '../../../../../../services/services.token';

@Injectable({
  providedIn: 'root',
})
export class LoadNovelformDataService {
  constructor(
    private router: Router, 
    private firestore: AngularFirestore,
    @Inject(AuthServicetoken) private authService : AuthService
  ) {}

  getStaff(): Promise<Array<Staff>> {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection<User>('users', (fn) => fn.where('role', '!=', 'reader'))
        .valueChanges()
        .pipe(take(1))
        .toPromise()
        .then((users) => {
          let staff: Array<Staff> = [];
          users.map((user) => {
            staff.push({
              username: user.username,
              uid: user.url,
            });
          });
          resolve(staff);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getGenre() : string{
    let urlTree =  this.router.url.split("/");
    return urlTree[urlTree.length - 2];
  }

  getDefaultEditor() : Promise<string>{
    return new Promise<string>((resolve, reject) => {
      this.authService.getUid()
      .then((uid : string) => resolve(uid))
      .catch((error : any) => reject(error));
    })
  }

}
