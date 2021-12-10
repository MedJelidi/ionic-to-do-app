import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ReverseAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /** Grants access if there is no user signed in. */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuth().pipe(
      map((u) => {
        if (u) {
          this.router.navigateByUrl('/home').then()
          return false
        }
        return true
      }),
    )
  }
}
