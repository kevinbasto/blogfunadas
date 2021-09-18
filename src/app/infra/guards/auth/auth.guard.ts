import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-related/auth/auth.service';
import { AuthServicetoken } from '../../services/services.token';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(
    @Inject(AuthServicetoken) private authService : AuthService,
    private router : Router
  ){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<any>(async(resolve, reject) => {
      let isAuth : boolean = await this.authService.isAuth();
      if(isAuth)
        resolve(true);
      else
        this.router.navigate(['/auth/login']);
    });
  }
  
}
