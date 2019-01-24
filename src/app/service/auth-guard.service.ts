import {Injectable} from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {CookieService} from './cookie.service';


@Injectable()
export class AuthGuardService {

  constructor(private router: Router,
              private _cookie: CookieService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log(url);
    switch (url) {
      case '/shop':
        if (this._cookie.getCookie(`t`)) {
          return true;
        } else {
          this.router.navigate(['error']);
          return false;
        }
      case '/success':
        if (this._cookie.getCookie(`t`)) {
          return true;
        } else {
          this.router.navigate(['error']);
          return false;
        }
      default:
        this.router.navigate(['error'], {queryParams: {rcode: '404', msg: '参数异常，请重新扫码'}});
        return false;
    }
  }


}
