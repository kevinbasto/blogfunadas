import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from '../../../../core/interfaces/user.interface';
import { Auth } from '../../../../core/services/auth/auth';

@Injectable()
export class AuthService implements Auth {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore : AngularFirestore
    ) {}

  isAuth(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState
        .pipe(take(1))
        .toPromise()
        .then((session) => resolve(!!session))
        .catch((err) => reject(false));
    });
  }

  getProfileRole() : Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.afAuth.authState
      .pipe(take(1))
      .toPromise()
      .then((session) => {
        this.firestore.doc(`/users/${session.uid}`).valueChanges().pipe(take(1)).toPromise()
        .then((result : any) => {
          resolve(result.role);
        }).catch((err) => {
          reject(err);
        });
      })
    });
    console.log("a");
  }
}
