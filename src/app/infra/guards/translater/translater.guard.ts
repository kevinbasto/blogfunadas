import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Novel } from '../../../core/interfaces/novel.interface';
import { Auth } from '../../../core/services/auth/auth';
import { AuthServicetoken } from '../../services/services.token';

@Injectable()
export class TranslaterGuard implements CanActivate {

  constructor(
    @Inject(AuthServicetoken) private authService : Auth,
    private firestore : AngularFirestore,
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>(async (resolve, reject) => {
      let role : string = await this.authService.getProfileRole();
      if(role == "admin"){
        resolve(true);
        return;
      }
      let uid : string = await this.authService.getUid()
      let genrePostion : number = 2;
      let novelIdPosition : number = 3;
      let genre : string = state.url.split("/")[genrePostion];
      let novelId : string = state.url.split("/")[novelIdPosition];
      await this.firestore.doc<Novel>(`/${genre}/${novelId}`).valueChanges().pipe(take(1)).toPromise()
      .then(novel => {
        let allowed : boolean = false;
        for(let translator of novel.translators)
          if(translator == uid)
            allowed = true;
        if(allowed)
          resolve(true);
        else
          this.router.navigate([`/admin/${genre}`]);
      })
    });
  }
  
}
