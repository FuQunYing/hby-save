import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {CookieService} from './cookie.service';

@Injectable()
export class PageInfoService {
  prod = environment.production;
  public header = {
    'Content-Type': 'application/json; charset=UTF-8',
    'x-access-token': this._cookie.getCookie('t'),
  };

  constructor(private http: HttpClient,
              private _cookie: CookieService) {
  }

  getInit(): Observable<any> {
    const uri = '/api/init';
    return this.http.get(uri, {headers: this.header});
  }

  getCard(): Observable<any> {
    const uri = '/api/card/info';
    return this.http.get(uri, {headers: this.header});
  }

  getbasicInfo(mcode: string): Observable<any> {
    const uri = '/api/page/basicInfo';
    const body = {
      'data': {
        'mcode': mcode
      },
      'sign': '1234'
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

  getmarket(pageNum: number, pageSize: number): Observable<any> {
    const uri = '/api/market';
    const body = {
      'pageNum': pageNum,
      'pageSize': pageSize,
      'step': 'start'
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

  getgoods(): Observable<any> {
    const uri = '/api/defpage/channel';
    return this.http.get(uri, {headers: this.header});
  }
}

