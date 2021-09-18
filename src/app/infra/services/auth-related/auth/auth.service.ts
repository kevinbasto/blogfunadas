import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Auth } from '../../../../core/services/auth/auth';

@Injectable()
export class AuthService implements Auth {
  constructor(private afAuth: AngularFireAuth) {}

  async isAuth(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth.authState
        .pipe(take(1))
        .toPromise()
        .then((session) => resolve(!!session))
        .catch((err) => reject(false));
    });
  }
}
