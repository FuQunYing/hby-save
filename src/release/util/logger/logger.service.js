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
import { Inject, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
var LoggerService = /** @class */ (function () {
    function LoggerService(_loggerState) {
        this._loggerState = _loggerState;
    }
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._loggerState) {
            // console.log(...args);
            console.log.apply(console, arguments);
        }
    };
    LoggerService.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._loggerState) {
            // console.warn(...args);
            console.warn.apply(console, arguments);
        }
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._loggerState) {
            // console.error(...args);
            console.error.apply(console, arguments);
        }
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._loggerState) {
            // console.log(...args);
            console.log.apply(console, arguments);
        }
    };
    LoggerService.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._loggerState) {
            // console.log('[NG-ZORRO-DEBUG]', ...args);
            var arrs = Array.prototype.slice.call(arguments);
            console.log.apply(console, ['[NG-ZORRO-DEBUG]'].concat(arrs));
        }
    };
    LoggerService = __decorate([
        Injectable(),
        __param(0, Inject(NZ_LOGGER_STATE)),
        __metadata("design:paramtypes", [Boolean])
    ], LoggerService);
    return LoggerService;
}());
export { LoggerService };
export var NZ_LOGGER_STATE = new InjectionToken('nz-logger-state'); // Whether print the log
export function LOGGER_SERVICE_PROVIDER_FACTORY(exist, loggerState) { return exist || new LoggerService(loggerState); }
export var LOGGER_SERVICE_PROVIDER = {
    provide: LoggerService,
    useFactory: LOGGER_SERVICE_PROVIDER_FACTORY,
    deps: [[new Optional(), new SkipSelf(), LoggerService], NZ_LOGGER_STATE]
};
