import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NzModalService} from '../../../components/cui.module';
import {GoodsComponent} from './goods.component';
import {CardService} from '../../service/card.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit {

  constructor(private modalService: NzModalService,
              public _cardService: CardService) {
  }

  selectGood(good: Array<object>) {
    const subscription = this.modalService.open({
      content: GoodsComponent,
      footer: false,
      componentParams: {
        goods: good
      }
    });
  }

  // 返回总数量；
  returnSum(goodsArr: Array<any>) {
    let tmp = 0;
    for (const i of goodsArr) {
      tmp += i.quantity;
    }
    return tmp;
  }

  ngOnInit() {
  }

}
