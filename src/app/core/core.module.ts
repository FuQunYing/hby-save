import {NgModule, Optional, SkipSelf} from '@angular/core';
import {ServicesModule} from '../service/service.module';
import {Router} from '@angular/router';
import {CookieService} from '../service/cookie.service';
import {environment} from '../../environments/environment';

@NgModule({
  imports: [
    ServicesModule.forRoot(),
  ],
  declarations: []
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule,
              private router: Router,
              private _cookie: CookieService) {
    if (parentModule) {
      throw new Error('CoreModule 已经装载，请仅在 AppModule 中引入该模块。');
    }

    if (this.GetQueryString(`n`)) {

      this._cookie.setCookie(`t`, this.GetQueryString(`t`), environment.cookieTime);
      this._cookie.setCookie(`n`, this.GetQueryString(`n`), environment.cookieTime);
    } else {
      console.log(`参数为空`);
    }
  }

  /**
   * 获取URL参数
   * @param name
   * @returns {any}
   * @constructor
   */

  GetQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }

}
