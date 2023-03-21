import { AuthService } from './auth.service';
import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthGuard {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<Boolean> {
    return this.authSvc.isLogged$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
