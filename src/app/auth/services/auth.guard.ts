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

// export const AuthGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authSvc = inject(AuthService);
//   const router = inject(Router);

//   return authSvc.isLogged$.pipe(
//     map((isLoggedIn) => {
//       if (isLoggedIn) {
//         return true;
//       }

//       router.navigateByUrl('/');
//       return false;
//     })
//   );
// };

// @Injectable()
// export class AuthGuard implements CanMatch {
//   constructor(private authSvc: AuthService, private router: Router) {}

//   canMatch(
//     route: Route,
//     segments: Array<UrlSegment>
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     return this.authSvc.isLogged$.pipe(
//       map((isLoggedIn) => {
//         if (isLoggedIn) {
//           return true;
//         }

//         this.router.navigateByUrl('/');
//         return false;
//       })
//     );
//   }
// }
