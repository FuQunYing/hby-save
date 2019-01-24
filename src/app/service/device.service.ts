import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()

export class DeviceService {
  public header = {
    'x-access-token': JSON.parse(localStorage.getItem('user')).token,
    'secret': JSON.parse(localStorage.getItem('user')).secret,
  };

  constructor(private http: HttpClient) {
  }

  /**
   * 获取设备信息
   * @returns {Promise<any>}
   */
  getDevice(pageNum: number, pageSize: number): Observable<any> {
    const uri = '/api/v1/m/device';
    const body = {
      'pageNum': pageNum,
      'pageSize': pageSize,
      'step': 'start'
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

  /**
   * 获取设备货道信息
   * @param {string} mcode
   * @param {string} sn
   * @param {number} pageNum
   * @param {number} pageSize
   * @returns {Observable<any>}
   */
  getChannel(mcode: string,
             sn: string,
             pageNum: number,
             pageSize: number): Observable<any> {
    const uri = '/api/v1/m/devChannel';
    const body = {
      'mcode': mcode,
      'sn': sn,
      'pageNum': pageNum,
      'pageSize': pageSize,
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

  // 编辑货道信息
  editChannel(body: any): Observable<any> {
    const uri = '/api/v1/m/setChannelInfo';
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

  // 设置货道离线
  offChannel(body: any): Observable<any> {
    const uri = '/api/v1/m/channelLine';
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

  // 移除货道商品
  pullOffGoods(mcode: string, channel: string): Observable<any> {
    const uri = '/api/v1/m/pullOff';
    const body = {
      'mcode': mcode,
      'channel': channel
    };
    return this.http.post(uri, JSON.stringify(body), {headers: this.header});
  }

}
