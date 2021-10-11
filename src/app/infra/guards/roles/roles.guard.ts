import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../../../core/interfaces/user.interface';
import { Auth } from '../../../core/services/auth/auth';
import { AuthServicetoken } from '../../services/services.token';

@Injectable()
export class RolesGuard implements CanActivateChild {

  constructor(
    private auth : AngularFireAuth,
    private firestore : AngularFirestore,
    private router : Router,
  ){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>(async (resolve, reject) => {
      let uid;
      await this.auth.authState
      .pipe(take(1)).toPromise()
      .then(auth => uid = auth.uid)
      .catch(() => this.router.navigate(['/client/latest']));
      this.firestore.doc(`/users/${uid}`).valueChanges().pipe(take(1)).toPromise()
      .then( (user : any) => {
        if(user.role != 'staff')
          this.router.navigate(['/client/latest'])
        else
          resolve(true)
      })
    });
  }
  
}
