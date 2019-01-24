import {NgModule, ModuleWithProviders} from '@angular/core';
import {CookieService} from './cookie.service';
import {AuthGuardService} from './auth-guard.service';

// 页面信息获取
import {PageInfoService} from './page-info.service';

// 卡信息
import {CardService} from './card.service';

// 机器状态
import {StatusService} from './status.service';
import {MqttService} from './mqtt.service';

export {
  AuthGuardService,
  CookieService,
  MqttService,
  PageInfoService,
  CardService,
  StatusService
};

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        AuthGuardService,
        CookieService,
        MqttService,
        PageInfoService,
        CardService,
        StatusService
      ]
    };
  }
}

