import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  rcode: string;
  msg: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.rcode = params['rcode'];
        this.msg = params['msg'];
        console.log(this.rcode);
        console.log(this.msg);
      });
  }
}
