var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LoggerModule } from '../util/logger/index';
import { zhCN } from './locales/index';
import { NZ_LOCALE_SERVICE_PROVIDER } from './nz-locale.service';
import { NZ_LOCALE } from './nz-locale.token';
import { NzTranslatePipe } from './nz-translate.pipe';
var NzLocaleModule = /** @class */ (function () {
    function NzLocaleModule() {
    }
    NzLocaleModule = __decorate([
        NgModule({
            imports: [LoggerModule],
            declarations: [NzTranslatePipe],
            exports: [NzTranslatePipe],
            providers: [
                { provide: NZ_LOCALE, useValue: zhCN },
                NZ_LOCALE_SERVICE_PROVIDER,
            ],
        })
    ], NzLocaleModule);
    return NzLocaleModule;
}());
export { NzLocaleModule };
