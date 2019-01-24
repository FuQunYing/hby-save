import {Injectable} from '@angular/core';
import {Goods} from '../domain';

export class Device {
  appid: string;
  aux: string;
  client: string;
  mcode: string;
  sn: string;
}

export class BaseInfo {
  change_time: string;
  complain: string;
  configer: Array<any>;
  limit_amount: string;
  logo: string;
  mcInterval: string;
  mcWidth: string;
  telephone: string;
  title: string;
}

export class Card {
  cardno: string;
  mqttpswd: string;
  namount: number;
  red_packet: number;
}

@Injectable()
export class CardService {
  // 设备init属性
  public device: Device = new Device;

  // 页面init属性
  public baseInfo: BaseInfo = new BaseInfo;

  // 货道信息
  public goodsList: Array<Goods> = new Array<Goods>(0);

  // 卡信息
  public card: Card = new Card;

  // 设备支付锁
  public deviceLocked = false;
}
