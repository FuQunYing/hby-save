import {NgModule, LOCALE_ID} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';
import {RoutesModule} from './routes/routes.module';
import {DefaultInterceptor} from './core/net/default.interceptor';

import { registerLocaleData } from '@angular/common';
import lcoaleZhHans from '@angular/common/locales/zh-Hans';

registerLocaleData(lcoaleZhHans);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RoutesModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'zh-Hans'},
    {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
