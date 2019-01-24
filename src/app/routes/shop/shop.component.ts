import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CardService} from '../../service/card.service';
import {NzModalService} from '../../../components/cui.module';
import {StatusService} from '../../service/status.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  loading = true;

  constructor(public _cardService: CardService,
              public _statusService: StatusService,
              private confirmServ: NzModalService,
              private sanitizer: DomSanitizer) {
  }

  showCardDetail(i: any) {
    this.confirmServ.confirm({
      title: `会员卡详情`,
      content: `<h1>￥${((i.namount / 100 + i.red_packet / 100)).toFixed(2)}</h1>
                <p>当前总余额</p><br/><br/>
                <p>卡号：${i.cardno}</p>
                <span>卡余额：￥${(i.namount / 100).toFixed(2)}; 红包：￥${(i.red_packet / 100).toFixed(2)}</span>`,
      onOk() {
      },
      onCancel() {
      }
    });
  }

  logoUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
  }

  ngOnInit() {
  }

}
