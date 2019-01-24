import {Injectable, Input} from '@angular/core';
import {environment} from '../../environments/environment';
import {Paho} from 'ng2-mqtt/mqttws31';
import {CardService} from './card.service';
import {StatusService} from './status.service';
import {Router} from '@angular/router';
import {NzModalService} from '../../components/cui.module';
import {NzMessageService} from '../../components/cui.module';

declare var WeixinJSBridge: any;
declare var AlipayJSBridge: any;

@Injectable()
export class MqttService {
  public _mqtt_host = environment.mqtt_host;
  public _client: Paho.MQTT.Client;
  public reAliveTime = 0;
  public mqttCommand = {
    devAlive: () => JSON.stringify(
      {
        'clientid': this._cardService.card.cardno,
        'action': 'dev_alive',
        'data': {
          'sn': this._cardService.device.sn,
          'cardno': this._cardService.card.cardno
        }
      }),
    flash: () => JSON.stringify(
      {
        'clientid': this._cardService.card.cardno,
        'action': 'flash',
        'data': {
          'sn': this._cardService.device.sn,
          'cardno': this._cardService.card.cardno
        }
      }),
    getOrder: (goods) => JSON.stringify(
      {
        'clientid': this._cardService.card.cardno,
        'action': 'get_order',
        'data': {
          'sn': this._cardService.device.sn,
          'cardno': this._cardService.card.cardno,
          'goods': goods
        }
      }),
    pay: (tn) => JSON.stringify(
      {
        'clientid': this._cardService.card.cardno,
        'action': 'pay',
        'data': {
          'sn': this._cardService.device.sn,
          'cardno': this._cardService.card.cardno,
          'tn': tn
        }
      }),
    delay: () => JSON.stringify(
      {
        'clientid': this._cardService.card.cardno,
        'action': 'delay',
        'data': {
          'sn': this._cardService.device.sn,
          'cardno': this._cardService.card.cardno
        }
      }),
  };

  constructor(public _cardService: CardService,
              public _statusService: StatusService,
              private router: Router,
              private confirmServ: NzModalService,
              private _message: NzMessageService) {
  }

  showConfirm(s) {
    const topay = (tn) => {
      this._cardService.deviceLocked = true;
      this._message.loading('玩命加载中...', {nzDuration: 0});
      this.pay(tn);
    };
    let pay_detail = '';
    if (s.pay_info.d3pay > 0) {
      const type = this._cardService.device.client === 'weixin' ? '微信支付 ¥' : '支付宝支付 ¥';
      pay_detail += type + s.pay_info.d3pay.toFixed(2) + '；';
    }
    if (s.pay_info.card_pay > 0) {
      pay_detail += '余额支付 ¥' + s.pay_info.card_pay.toFixed(2) + '；';
    }
    if (s.pay_info.red_packet > 0) {
      pay_detail += '红包支付 ¥' + s.pay_info.red_packet.toFixed(2);
    }

    this.confirmServ.confirm({
      title: '支付信息',
      content: `<h1>￥${s.pay_info.total.toFixed(2)}</h1><p>${pay_detail}</p>`,
      onOk() {
        topay(s.tn);
      },
      onCancel() {
      }
    });
  }

  public connect() {
    this._client = new Paho.MQTT.Client(this._mqtt_host, Number(8083), this._cardService.card.cardno);
    const options = {
      timeout: 60,
      userName: this._cardService.card.cardno,
      password: this._cardService.card.mqttpswd,
      invocationContext: {
        host: this._mqtt_host,
        port: Number(8083),
        clientId: this._cardService.card.cardno
      },
      keepAliveInterval: 30,
      cleanSession: true,
      onSuccess: () => {
        console.log('connect success');
        this._client.subscribe(this._cardService.card.cardno, {qos: 0});
        this.flash();
        this.devAlive();
      },
      onFailure: (context) => {
        console.log(`Failed to connect` + context.errorMessage);
      }
    };
    // lastWillMessage 发送消息
    const lastWillMessage = new Paho.MQTT.Message(`{'clientid':${this._cardService.card.cardno},
    'cardno':${this._cardService.card.cardno},'data':{'name':'willonline','rcode':'0'}}`);
    lastWillMessage.destinationName = 'mobwill';
    lastWillMessage.qos = 0;
    lastWillMessage.retained = false;
    (options as any).willMessage = lastWillMessage;
    this._client.onConnectionLost = (responseObject) => {
      if ((responseObject as any).errorCode !== 0) {
        this.router.navigate(['error'], {queryParams: {rcode: 'MQ101', msg: '页面掉线，请重新扫码'}});
      }
    }
    ;
    this._client.onMessageArrived = (message) => {
      let messagej;
      try {
        // messagej = eval('(' + message.payloadString + ')');
        messagej = JSON.parse(message.payloadString);
      } catch (err) {
        return console.log(err);
      }
      switch (messagej.action) {
        case 'return_err':
          this.retrunErr(messagej);
          break;
        case 'dev_alive_return':
          this.aliveReturn(messagej);
          break;
        case 'flash_return':
          this.flashReturn(messagej);
          break;
        case 'return_get_order':
          this.returnGetOrder(messagej);
          break;
        case 'return_pay':
          this.returnPay(messagej);
          break;
        case 'return_coin':
          this.returnCoin(messagej);
          break;
        case 'charge':
          this.charge(messagej);
          break;
        case 'return_delay':
          this.returnDelay(messagej);
          break;
        case 'return_js_payment':
          this.returnJsPayment(messagej);
          break;
      }
    };
    this._client.connect(options);
  }

  public publish(topic, qos, messagej, retain) {
    const message = new Paho.MQTT.Message(messagej);
    message.destinationName = topic;
    message.qos = Number(qos);
    message.retained = retain;
    console.log(messagej);
    try {
      this._client.send(message);
    } catch (err) {
      console.log(err);
    }
  }

  // PAGE ---> SERVER =========================================================START

  // 重新查询设备状态
  public devAliveSetTimeout(time) {
    window.setTimeout(() => {
      this.devAlive();
    }, time);
  }

  // 询问设备状态
  public devAlive() {
    this.publish('dev_alive', 2, this.mqttCommand.devAlive(), false);
  }

  // 获取卡的余额信息
  public flash() {
    this.publish('flash', 2, this.mqttCommand.flash(), false);
  }

  // 获取预购单
  public getOrder(goods) {
    this._message.loading('玩命加载中...', {nzDuration: 0});
    this.publish('get_order', 2, this.mqttCommand.getOrder(goods), false);
  }

// 支付
  public pay(tn) {
    this.publish('pay', 2, this.mqttCommand.pay(tn), false);
  }

// 询问剩余时长
  public pubDelay() {
    this.publish('delay', 2, this.mqttCommand.delay(), false);
  }

  // SERVE--->RPAGE ---------------------------------------------------------START
  // 返回错误
  public retrunErr(messagej) {
    console.log('retrunErr');
    console.log(messagej);
    // TODO 移除锁、隐藏loading、弹出错误提示
  }

  // 响应设备状态
  public aliveReturn(messagej) {
    console.log('aliveReturn');
    console.log(messagej);
    const machAlive = messagej.data.alive_status; // 机器是否存活
    const insetCoin = messagej.data.inset_coin; // 机器是否可投币
    const goods_alive = JSON.parse(messagej.data.goods_alive); // 货道状态

    // for (const i in goods_alive) {
    //   if (goods_alive[i] !== 0) {
    //     const id = i - 1;
    //     console.log('货道' + id + '的状态是' + goods_alive[i]);
    //   }
    // }

    if (machAlive === '0') {
      if (insetCoin === '0') {
        // TODO 设备正常售卖dev_online();
        this._statusService.status = '';
        this._statusService.status_dot = false;
      } else {
        // 设置异常信息，并提示
        if (this.reAliveTime < 5) {
          this.reAliveTime++;
          this.devAliveSetTimeout(4000);
        } else {
          console.log('设备长时间未响应');
          this._statusService.status = '设备离线';
        }
      }
    } else {
      // 设置异常信息，并提示
      this._statusService.status = environment.config.errObj[insetCoin];
      this._statusService.status_dot = true;
      if (this.reAliveTime < 5) {
        this.reAliveTime++;
        this.devAliveSetTimeout(4000);
      } else {
        console.log('设备长时间未响应');
        this._statusService.status = '设备离线';
      }
    }

  }

  // 返回卡的信息
  public flashReturn(messagej) {
    console.log('flashReturn');
    console.log(messagej);
    this._cardService.card.namount = messagej.data.card_info.namount;
    this._cardService.card.red_packet = messagej.data.card_info.red_packet;
  }

  // 返回预购单的支付信息，支付金额，购买商品，优惠信息，等待确认支付
  public returnGetOrder(messagej) {
    console.log('returnGetOrder');
    console.log(messagej);
    this._message.remove();
    this.showConfirm(messagej.data);
  }

  // 返回支付信息
  public returnPay(messagej) {
    console.log('returnPay');
    console.log(messagej);
    this.flash();
  }

  public returnCoin(messagej) {
    console.log('returnCoin');
    console.log(messagej);
    this._message.remove();
    this.flash();
    // 重置支付状态，转到成功路由
    this._statusService.step = 1;
    this.router.navigate(['success']);
  }

  // 找零并出货
  public charge(messagej) {
    console.log('charge');
    console.log(messagej);
    if (messagej.rcode === '0') {
      this._statusService.step = 2;
      this.flash();
    } else {
      let str = '';
      const sum = (messagej.data.charge_info.red_packet + messagej.data.charge_info.card_pay) / 100;
      for (let i = 0; i < messagej.data.goods.length; i++) {
        str += '货道' + messagej.data.goods[i].r + '出货失败;';
      }
      console.log(sum);
      console.log(str);
    }

  }

  public returnDelay(messagej) {
    console.log('returnDelay');
    console.log(messagej);
  }

  public returnJsPayment(messagej) {
    console.log('returnJsPayment');
    console.log(messagej);
    this._message.remove();
    this.goPay(messagej.data.pre_payment, this._cardService.device.client);
  }

  // 微信支付宝支付成功标识 -- 废除 --> 支付成功标识改为 pay_return
  goPay(payargs, client) {

    this._statusService.step = 1;

    const removeLocked = () => {
      this._cardService.deviceLocked = false;
    };
    switch (client) {
      case 'weixin':
        console.log('weixin_pay');
        WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, (res) => {
          switch (res.err_msg) {
            case 'get_brand_wcpay_request:ok':
              // 支付结束，出货等待
              removeLocked();
              // 重置支付状态，转到成功路由
              // goto();
              break;
            case 'get_brand_wcpay_request:cancel':
              // 重置投币锁
              removeLocked();
              break;
            case 'get_brand_wcpay_request:fail':
              // 重置投币锁
              removeLocked();
              break;
            default:
              break;
          }
        });
        break;
      case 'alipay':
        AlipayJSBridge.call('tradePay', payargs, (result) => {
          if (result.resultCode === '9000') {
            // 支付结束，出货等待
            // removeLocked();
            // 重置支付状态，转到成功路由
            // goto();
          } else {
            // 重置投币锁
            removeLocked();
            alert('支付失败!');
          }
        });
        break;
      default:
        break;
    }
  }
}
