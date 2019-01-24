var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG } from './nz-message-config';
var NzMessageContainerComponent = /** @class */ (function () {
    function NzMessageContainerComponent(defaultConfig, config) {
        this.messages = [];
        this.config = __assign({}, defaultConfig, config);
    }
    // Create a new message
    NzMessageContainerComponent.prototype.createMessage = function (message) {
        if (this.messages.length >= this.config.nzMaxStack) {
            this.messages.splice(0, 1);
        }
        message.options = this._mergeMessageOptions(message.options);
        this.messages.push(message);
    };
    // Remove a message by messageId
    NzMessageContainerComponent.prototype.removeMessage = function (messageId) {
        var _this = this;
        this.messages.some(function (message, index) {
            if (message.messageId === messageId) {
                _this.messages.splice(index, 1);
                return true;
            }
        });
    };
    // Remove all messages
    NzMessageContainerComponent.prototype.removeMessageAll = function () {
        this.messages = [];
    };
    // Merge default options and cutom message options
    NzMessageContainerComponent.prototype._mergeMessageOptions = function (options) {
        var defaultOptions = {
            nzDuration: this.config.nzDuration,
            nzAnimate: this.config.nzAnimate,
            nzPauseOnHover: this.config.nzPauseOnHover
        };
        return __assign({}, defaultOptions, options);
    };
    NzMessageContainerComponent = __decorate([
        Component({
            selector: 'nz-message-container',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <div class=\"ant-message\">\n      <nz-message *ngFor=\"let message of messages; let i = index\" [nzMessage]=\"message\" [nzIndex]=\"i\"></nz-message>\n    </div>\n  ",
            styleUrls: [
                './style/index.less'
            ]
        }),
        __param(0, Optional()), __param(0, Inject(NZ_MESSAGE_DEFAULT_CONFIG)),
        __param(1, Optional()), __param(1, Inject(NZ_MESSAGE_CONFIG)),
        __metadata("design:paramtypes", [Object, Object])
    ], NzMessageContainerComponent);
    return NzMessageContainerComponent;
}());
export { NzMessageContainerComponent };
