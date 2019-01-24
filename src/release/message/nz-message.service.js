var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { NzMessageContainerComponent } from './nz-message-container.component';
// TODO: remove MessageData generic type as it has no contributon in typing
var NzMessageBaseService = /** @class */ (function () {
    function NzMessageBaseService(overlay, containerClass, _idPrefix) {
        if (_idPrefix === void 0) { _idPrefix = ''; }
        this._idPrefix = _idPrefix;
        this._counter = 0; // Id counter for messages
        this._container = overlay.create().attach(new ComponentPortal(containerClass)).instance;
    }
    NzMessageBaseService.prototype.remove = function (messageId) {
        if (messageId) {
            this._container.removeMessage(messageId);
        }
        else {
            this._container.removeMessageAll();
        }
    };
    NzMessageBaseService.prototype.createMessage = function (message, options) {
        // TODO: spread on literal has been disallow on latest proposal
        var resultMessage = __assign({}, message, {
            messageId: this._generateMessageId(),
            options: options,
            createdAt: new Date()
        });
        this._container.createMessage(resultMessage);
        return resultMessage;
    };
    NzMessageBaseService.prototype._generateMessageId = function () {
        return this._idPrefix + this._counter++;
    };
    return NzMessageBaseService;
}());
export { NzMessageBaseService };
var NzMessageService = /** @class */ (function (_super) {
    __extends(NzMessageService, _super);
    function NzMessageService(overlay) {
        return _super.call(this, overlay, NzMessageContainerComponent, 'message-') || this;
    }
    // Shortcut methods
    NzMessageService.prototype.success = function (content, options) {
        return this.createMessage({ type: 'success', content: content }, options);
    };
    NzMessageService.prototype.error = function (content, options) {
        return this.createMessage({ type: 'error', content: content }, options);
    };
    NzMessageService.prototype.info = function (content, options) {
        return this.createMessage({ type: 'info', content: content }, options);
    };
    NzMessageService.prototype.warning = function (content, options) {
        return this.createMessage({ type: 'warning', content: content }, options);
    };
    NzMessageService.prototype.loading = function (content, options) {
        return this.createMessage({ type: 'loading', content: content }, options);
    };
    NzMessageService.prototype.create = function (type, content, options) {
        return this.createMessage({ type: type, content: content }, options);
    };
    // For content with html
    NzMessageService.prototype.html = function (html, options) {
        return this.createMessage({ html: html }, options);
    };
    NzMessageService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Overlay])
    ], NzMessageService);
    return NzMessageService;
}(NzMessageBaseService));
export { NzMessageService };
