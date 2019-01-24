import {Injectable, Injector} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(res: HttpResponse<any>): Observable<any> {
    switch (res.status) {
      case 200:
        switch (res.body.rcode) {
          case 0:
            break;
          case 304:
            // token 过期 301 s
            // this._message.create('warning', `${res.body.msg};请重新登陆`);
            // localStorage.removeItem('user');
            // setTimeout(() => {
            //   this.goTo('/login');
            // }, 1000);
            break;
          default:
            // this._message.create('error', `${res.body.msg}`);
        }
        break;
      case 400:
        // this._message.create('error', `${res.body.msg}`);
        break;
      case 401:
        // TODO 提示未登陆，1秒后转跳到登陆页
        this.goTo('/login');
        break;
      case 422:
        console.log('422');
        // this._message.create('error', `${res.body.msg}`);
        break;
      case 404:
        // this._message.create('error', `404,API不存在`);
        break;
      case 500:
        // this.goTo('/login');
        break;
      case 504:
        // this._message.create('error', `网关超时`);
        break;
    }
    return of(res);
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpSentEvent |
    HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const newReq = req.clone({
      headers: req.headers.set(
        'Content-Type', 'application/json; charset=UTF-8'
      ),
      // setHeaders: this.header
    });
    return next.handle(newReq)
      .pipe(
        mergeMap((event: any) => {
          // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
          if (event instanceof HttpResponse && event.status === 200) {
            return this.handleData(event);
          }
          // 若一切都正常，则后续操作
          return of(event);
        }),
        catchError((err: HttpResponse<any>) => this.handleData(err))
      );
  }

}
