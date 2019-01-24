import {Component, Input, OnInit} from '@angular/core';
import {NzModalSubject} from '../../../components/cui.module';
import {Goods} from '../../domain';

@Component({
  selector: 'nz-goods-component',
  template: `
    <div>
      <div class="img">
        <img src="{{_goods[0].img}}">
      </div>
      <div class="bottom">
        <div class="title">{{_goods[0].goods_name}}</div>
        <div class="desc">{{_goods[0].description}} {{_goods[0].spec}}</div>
        <div class="desc">剩余: {{returnSum(_goods)}}</div>
        <strong class="price">{{(_goods[0].price)/100 | currency:'￥'}}</strong>
        <app-cart-control [good]='_goods'></app-cart-control>
      </div>
    </div>
  `,
  styles: [
      `
      .img {
        width: 100%;
        height: 8.533333rem;
        height: 85.333333vw;
        display: block;
        overflow: hidden;
        position: relative;
        border-radius: .106667rem .106667rem 0 0;
        border-radius: 1.066667vw 1.066667vw 0 0;
      }
      .img img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        -o-object-fit: contain;
        object-fit: contain;
      }
      .bottom{
        position: relative;
        padding: .4rem .4rem 0;
        padding: 4vw 4vw 0;
        width: 100%;
        height: 2.933333rem;
        height: 29.333333vw;
      }
      .bottom .title{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: .133333rem;
        margin-bottom: 1.333333vw;
      }
      .bottom .desc{
        font-size: .293333rem;
        color: #666;
        line-height: .293333rem;
        line-height: 2.933333vw;
        margin-bottom: .16rem;
        margin-bottom: 1.6vw;
      }
      .bottom .price{
        position: absolute;
        bottom: .453333rem;
        bottom: 4.533333vw;
        font-weight: 700;
        font-size: .426667rem;
        line-height: .426667rem;
        line-height: 4.266667vw;
        color: #f60;
        padding-bottom: .093333rem;
        padding-bottom: .933333vw;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: baseline;
        -webkit-align-items: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
      }
    `
  ]
})
export class GoodsComponent implements OnInit {
  _goods: Array<Goods>;

  @Input()
  set goods(value: Array<Goods>) {
    this._goods = value;
  }
  // 返回总数量；
  returnSum(goodsArr: Array<any>) {
    let tmp = 0;
    for (const i of goodsArr) {
      tmp += i.quantity;
    }
    return tmp;
  }

  constructor(private subject: NzModalSubject) {
  }

  ngOnInit() {
  }
}
