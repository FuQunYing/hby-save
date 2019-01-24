import {Component, OnInit} from '@angular/core';
import {StatusService} from '../../service/status.service';
import {Router} from '@angular/router';
import {CardService} from '../../service/card.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(public status: StatusService,
              private router: Router,
              private _cardService: CardService) {
  }

  backHome() {
    for (const i of this._cardService.goodsList) {
      for (const j of (i as any)) {
        (j as any).count = 0;
      }
    }
    this.router.navigate(['shop']);
  }

  ngOnInit() {
  }

}
