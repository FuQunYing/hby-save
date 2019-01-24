import {Component, Input, OnInit} from '@angular/core';
import {MqttService} from '../../service/mqtt.service';
import {CardService} from '../../service/card.service';

// Goods为提交订单数据
export class Goods {
  goods_id: number;
  count: number;
  channel_sn: string;
  channel_road: number;
  dt: number;
  attach: number;
  type: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  fold = true;

  constructor(private _mqtt: MqttService,
              public _cardService: CardService) {
  }

  totalPrice() {
    let total = 0;
    // this.selectGoods.forEach((good) => {
    //   total += (good as any).price * (good as any).count;
    // });
    for (const i of this._cardService.goodsList) {
      for (const j of (i as any)) {
        if ((j as any).count > 0) {
          total += (j as any).price * (j as any).count;
        }
      }
    }
    return total / 100;
  }

  CaPrice(arr: Array<string>) {
    let price = 0;
    for (const i of arr) {
      if ((i as any).count > 0) {
        price += (i as any).price * (i as any).count;
      }
    }
    return price / 100;
  }

  // 返回已选数量；
  returnCount(goodsArr: Array<string>) {
    let tmp = 0;
    for (const i of goodsArr) {
      if ((i as any).count > 0) {
        tmp += (i as any).count;
      }
    }
    return tmp;
  }

  totalCount() {
    let count = 0;
    // this.selectGoods.forEach((good) => {
    //   count += (good as any).count;
    // });
    for (const i of this._cardService.goodsList) {
      for (const j of (i as any)) {
        if ((j as any).count > 0) {
          count += (j as any).count;
        }
      }
    }
    return count;
  }

  toggleCart() {
    if (!this.totalCount()) {
      return;
    }
    this.fold = !this.fold;
  }

  hideCart() {
    this.fold = true;
  }

  empty() {
    for (const i of this._cardService.goodsList) {
      for (const j of (i as any)) {
        (j as any).count = 0;
      }
    }
  }

  toPay() {
    if (this.totalCount() > 0) {
      let topayGoods;
      topayGoods = [];
      for (const i of this._cardService.goodsList) {
        for (const j of (i as any)) {
          if ((j as any).count > 0) {
            const tmp: Goods = new Goods;
            tmp.goods_id = (j as any).goods_id;
            tmp.count = (j as any).count;
            tmp.channel_sn = (j as any).channel;
            tmp.channel_road = (j as any).channel_sn;
            tmp.dt = 1000;
            tmp.attach = (j as any).price;
            tmp.type = 'spd';
            topayGoods.push((tmp as any));
          }
        }
      }
      this._mqtt.getOrder(topayGoods);
    }
  }

  ngOnInit() {
  }

}
