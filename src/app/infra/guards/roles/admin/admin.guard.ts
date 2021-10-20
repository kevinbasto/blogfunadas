import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../../../../core/services/auth/auth';
import { AuthServicetoken } from '../../../services/services.token';

@Injectable()
export class AdminGuard implements CanActivateChild {

  constructor(
    @Inject(AuthServicetoken) private auth : Auth,
    private router : Router
  ){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>((resolve, reject) => {
      this.auth.getProfileRole().then(role => {
        if(role == "admin")
          resolve(true);
        else
          this.router.navigate(['/admin/dashboard']);
      })
    });
  }
  
}
