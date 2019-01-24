var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { Component, Input, ViewEncapsulation, } from '@angular/core';
import { NzMessageContainerComponent } from './nz-message-container.component';
var NzMessageComponent = /** @class */ (function () {
    function NzMessageComponent(_messageContainer) {
        this._messageContainer = _messageContainer;
        this._eraseTimer = null;
    }
    NzMessageComponent.prototype.ngOnInit = function () {
        this._options = this.nzMessage.options;
        if (this._options.nzAnimate) {
            this.nzMessage.state = 'enter';
        }
        this._autoErase = this._options.nzDuration > 0;
        if (this._autoErase) {
            this._initErase();
            this._startEraseTimeout();
        }
    };
    NzMessageComponent.prototype.ngOnDestroy = function () {
        if (this._autoErase) {
            this._clearEraseTimeout();
        }
    };
    NzMessageComponent.prototype.onEnter = function () {
        if (this._autoErase && this._options.nzPauseOnHover) {
            this._clearEraseTimeout();
            this._updateTTL();
        }
    };
    NzMessageComponent.prototype.onLeave = function () {
        if (this._autoErase && this._options.nzPauseOnHover) {
            this._startEraseTimeout();
        }
    };
    // Remove self
    NzMessageComponent.prototype._destroy = function () {
        var _this = this;
        if (this._options.nzAnimate) {
            this.nzMessage.state = 'leave';
            setTimeout(function () { return _this._messageContainer.removeMessage(_this.nzMessage.messageId); }, 200);
        }
        else {
            this._messageContainer.removeMessage(this.nzMessage.messageId);
        }
    };
    NzMessageComponent.prototype._initErase = function () {
        this._eraseTTL = this._options.nzDuration;
        this._eraseTimingStart = Date.now();
    };
    NzMessageComponent.prototype._updateTTL = function () {
        if (this._autoErase) {
            this._eraseTTL -= Date.now() - this._eraseTimingStart;
        }
    };
    NzMessageComponent.prototype._startEraseTimeout = function () {
        var _this = this;
        if (this._eraseTTL > 0) {
            this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
            this._eraseTimer = window.setTimeout(function () { return _this._destroy(); }, this._eraseTTL);
            this._eraseTimingStart = Date.now();
        }
        else {
            this._destroy();
        }
    };
    NzMessageComponent.prototype._clearEraseTimeout = function () {
        if (this._eraseTimer !== null) {
            window.clearTimeout(this._eraseTimer);
            this._eraseTimer = null;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NzMessageComponent.prototype, "nzMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NzMessageComponent.prototype, "nzIndex", void 0);
    NzMessageComponent = __decorate([
        Component({
            selector: 'nz-message',
            encapsulation: ViewEncapsulation.None,
            animations: [
                trigger('enterLeave', [
                    state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
                    transition('* => enter', [
                        style({ opacity: 0, transform: 'translateY(-50%)' }),
                        animate('100ms linear')
                    ]),
                    state('leave', style({ opacity: 0, transform: 'translateY(-50%)' })),
                    transition('* => leave', [
                        style({ opacity: 1, transform: 'translateY(0)' }),
                        animate('100ms linear')
                    ]),
                ])
            ],
            template: "\n    <div class=\"ant-message-notice\"\n      [@enterLeave]=\"nzMessage.state\"\n      (mouseenter)=\"onEnter()\"\n      (mouseleave)=\"onLeave()\">\n      <div class=\"ant-message-notice-content\">\n        <div *ngIf=\"!nzMessage.html\" class=\"ant-message-custom-content\" [ngClass]=\"'ant-message-' + nzMessage.type\">\n          <ng-container [ngSwitch]=\"nzMessage.type\">\n            <i *ngSwitchCase=\"'success'\" class=\"anticon anticon-check-circle\"></i>\n            <i *ngSwitchCase=\"'info'\" class=\"anticon anticon-info-circle\"></i>\n            <i *ngSwitchCase=\"'warning'\" class=\"anticon anticon-exclamation-circle\"></i>\n            <i *ngSwitchCase=\"'error'\" class=\"anticon anticon-cross-circle\"></i>\n            <i *ngSwitchCase=\"'loading'\" class=\"anticon anticon-spin anticon-loading\"></i>\n          </ng-container>\n          <p>{{ nzMessage.content }}</p>\n        </div>\n        <div *ngIf=\"nzMessage.html\" [innerHTML]=\"nzMessage.html\"></div>\n      </div>\n    </div>\n  ",
            styleUrls: [
                './style/index.less'
            ]
        }),
        __metadata("design:paramtypes", [NzMessageContainerComponent])
    ], NzMessageComponent);
    return NzMessageComponent;
}());
export { NzMessageComponent };
