var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable:no-any */
import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import * as moment from 'moment';
import { LoggerService } from '../util/logger/index';
import { NzLocale } from './nz-locale.class';
import { NZ_LOCALE } from './nz-locale.token';
var NzLocaleService = /** @class */ (function () {
    function NzLocaleService(locale, _logger) {
        this._logger = _logger;
        this.setLocale(locale);
    }
    // [NOTE] Performance issue: this method may called by every change detections
    // TODO: cache more deeply paths for performance
    NzLocaleService.prototype.translate = function (path, data) {
        this._logger.debug("[NzLocaleService] Translating(" + this._locale.locale + "): " + path);
        var content = this._getObjectPath(this._locale, path);
        if (typeof content === 'string') {
            if (data) {
                Object.keys(data).forEach(function (key) { return content = content.replace(new RegExp("%" + key + "%", 'g'), data[key]); });
            }
            return content;
        }
        return path;
    };
    /**
     * Set/Change current locale globally throughout the WHOLE application
     * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
     * @param locale The translating letters
     */
    NzLocaleService.prototype.setLocale = function (locale) {
        moment.locale(locale.locale);
        this._locale = locale;
    };
    NzLocaleService.prototype.getLocale = function () {
        return this._locale;
    };
    NzLocaleService.prototype._getObjectPath = function (obj, path) {
        var res = obj;
        var paths = path.split('.');
        var depth = paths.length;
        var index = 0;
        while (res && index < depth) {
            res = res[paths[index++]];
        }
        return index === depth ? res : null;
    };
    NzLocaleService = __decorate([
        Injectable(),
        __param(0, Inject(NZ_LOCALE)),
        __metadata("design:paramtypes", [NzLocale, LoggerService])
    ], NzLocaleService);
    return NzLocaleService;
}());
export { NzLocaleService };
export function NZ_LOCALE_SERVICE_PROVIDER_FACTORY(exist, locale, logger) {
    return exist || new NzLocaleService(locale, logger);
}
export var NZ_LOCALE_SERVICE_PROVIDER = {
    provide: NzLocaleService,
    useFactory: NZ_LOCALE_SERVICE_PROVIDER_FACTORY,
    deps: [[new Optional(), new SkipSelf(), NzLocaleService], NZ_LOCALE, LoggerService],
};
