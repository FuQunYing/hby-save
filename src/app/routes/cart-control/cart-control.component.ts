import {Component, Input, OnInit} from '@angular/core';

export class Good {
  count: number;
  quantity: number;

  constructor() {
    this.count = 0;
    this.quantity = 0;
  }
}

@Component({
  selector: 'app-cart-control',
  templateUrl: './cart-control.component.html',
  styleUrls: ['./cart-control.component.scss']
})
export class CartControlComponent implements OnInit {
  @Input() good: Array<Good> = new Array(0);

  constructor() {
  }

  CaCount() {
    let count = 0;
    for (const i of this.good) {
      if (i.count) {
        count += i.count;
      }
    }
    return count;
  }

  decreaseCart(event): void {
    for (const i of this.good) {
      // 如果当前商品购物车有数量
      if (i.count) {
        i.count--;
        i.quantity++;
        // 跳出商品
        break;
      }
    }
  }

  addCart(event): void {
    for (const i of this.good) {
      // 如果当前商品有余量
      if (i.quantity) {
        // 如果是初始添加
        if (!i.count) {
          i.count = 1;
          i.quantity--;
        } else {
          if (i.quantity > 0) {
            i.count++;
            i.quantity--;
          }
        }
        // 跳出商品
        break;
      }
    }
  }

  ngOnInit() {
  }

}
