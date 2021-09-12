import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth } from '../../core/services/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Auth{

  public user$ : Observable<any>;

  constructor(
    private afAuth : AngularFireAuth,
    private angularFirestore : AngularFirestore
  ) { }

  setAuthUser(user : any) : void {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user)
        return this.angularFirestore.doc<any>(`users/${user.uid}`).valueChanges();
      else 
        return of(null);
    }))
  }
}
