import {Component} from '@angular/core';
import {MqttService} from './service/mqtt.service';
import {PageInfoService} from './service/page-info.service';
import {Title} from '@angular/platform-browser';
import {CardService} from './service/card.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>`,
})
export class AppComponent {

  constructor(private _pageService: PageInfoService,
              private titleService: Title,
              private _mqtt: MqttService,
              public _cardService: CardService) {

    this._pageService.getInit().subscribe(res => {
      if (res.rcode === 0) {

        // 获取设备init信息
        this._cardService.device = res.result;

        // 获取货道信息
        this._pageService.getgoods().subscribe(goods => {
          this._cardService.goodsList = goods.result.goods;
        });

        // 获取页面基础信息
        this._pageService.getbasicInfo(res.result.mcode).subscribe(res2 => {
          this._cardService.baseInfo = res2.result;
          this.titleService.setTitle(res2.result.title);
          switch (res.result.sn) {
            case '9601712050488':
            case '9611710230001':
            case '9601712050442':
              this._cardService.baseInfo.logo = 'assets/img/logo.jpg';
              console.log(this._cardService.baseInfo.logo);
              break;
            default:
              this._cardService.baseInfo.logo =
                res2.result && res2.result.logo ? res2.result.logo : 'http://b.coinect.cn/static/img/ytb.png';
              console.log(this._cardService.baseInfo.logo);
              break;
          }
        });

        // 获取卡基础信息
        this._pageService.getCard().subscribe(card => {
          if (card.rcode === 0) {
            this._cardService.card = card.result;
            this._mqtt.connect();
          }
        });
      }
    });

  }
}
