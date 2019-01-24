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
import { Component, ComponentFactory, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';
import nzGlobalMonitor from '../util/nz-global-monitor';
import { NzModalSubject } from './nz-modal-subject.service';
var NzModalComponent = /** @class */ (function () {
    function NzModalComponent(subject, _vcr, _locale) {
        this.subject = subject;
        this._vcr = _vcr;
        this._locale = _locale;
        this._confirmLoading = false;
        this._maskClosable = true;
        this._footerHide = false;
        this._closable = true;
        this._visible = false;
        this._prefixCls = 'ant-modal';
        this._width = '520px';
        this._zIndex = 1000;
        this._title = '';
        this._content = '';
        this._okText = this._locale.translate('Modal.okText');
        this._cancelText = this._locale.translate('Modal.cancelText');
        this._style = {};
        this._wrapClass = this._prefixCls + "-wrap";
        this._customClass = '';
        this._animationStatus = '';
        this._componentParams = {};
        this.modalId = "nzModal" + nzGlobalMonitor.getGlobalCount();
        this.nzVisibleChange = new EventEmitter();
        this.nzOnOk = new EventEmitter();
        // TODO: reconsider the payload type
        this.nzOnCancel = new EventEmitter();
        this.subject.modalId = this.modalId;
    }
    Object.defineProperty(NzModalComponent.prototype, "nzVisible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            var _this = this;
            var visible = toBoolean(value);
            if (this._visible === visible) {
                return;
            }
            if (visible) {
                this.anmiateFade('enter');
                this.subject.next('onShow');
                // 每次触发点击事件的时候，通过全局监听的类，记录下点击的位置，计算动画的origin
                setTimeout(function () {
                    _this.setStyles({
                        x: nzGlobalMonitor.lastClickPos.x || 0,
                        y: nzGlobalMonitor.lastClickPos.y || 0
                    });
                });
            }
            else {
                this.anmiateFade('leave');
                this.subject.next('onHide');
            }
            this._visible = visible;
            this.nzVisibleChange.emit(this._visible);
            // 设置全局的overflow样式
            nzGlobalMonitor.setDocumentOverflowHidden(visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzConfirmLoading", {
        set: function (value) {
            this._confirmLoading = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzClosable", {
        set: function (value) {
            this._closable = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzClass", {
        set: function (value) {
            this._customClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzWidth", {
        set: function (value) {
            this._width = typeof value === 'number' ? value + 'px' : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzZIndex", {
        set: function (value) {
            this._zIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzTitle", {
        set: function (value) {
            // TODO: should guard for string instead, all types are theoretically structural
            if (value instanceof TemplateRef) {
                this._titleTpl = value;
            }
            else {
                this._title = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzContent", {
        set: function (value) {
            if (value instanceof ComponentFactory) {
                // 如果容器对象已存在，则直接渲染，如果不存在，则设置到_bodyComponent，在ngAfterViewInit中执行
                if (this.bodyEl) {
                    var compRef = this.bodyEl.createComponent(value, null, this._vcr.injector);
                    Object.assign(compRef.instance, this._componentParams);
                }
                else {
                    this._bodyComponent = value;
                }
            }
            else if (value instanceof TemplateRef) {
                this._contentTpl = value;
            }
            else {
                this._content = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzFooter", {
        set: function (value) {
            if (value instanceof TemplateRef) {
                this._footerTpl = value;
            }
            else {
                this._footerHide = !toBoolean(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzOkText", {
        set: function (value) {
            this._okText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzCancelText", {
        set: function (value) {
            this._cancelText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzMaskClosable", {
        set: function (value) {
            this._maskClosable = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzStyle", {
        set: function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzWrapClassName", {
        set: function (value) {
            if (value) {
                this._wrapClass = this._prefixCls + "-wrap " + value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzModalComponent.prototype, "nzComponentParams", {
        set: function (value) {
            this._componentParams = value;
        },
        enumerable: true,
        configurable: true
    });
    NzModalComponent.prototype.onEsc = function (e) {
        if (this._maskClosable) {
            this.clickCancel(e);
        }
    };
    NzModalComponent.prototype.setStyles = function (origin) {
        var el = this.contentEl.nativeElement;
        var transformOrigin = origin ? origin.x - el.offsetLeft + "px " + (origin.y - el.offsetTop) + "px 0px" : '';
        // TODO: spread on literal has been disallow on latest proposal
        this._bodyStyleMap = __assign({
            'width': this._width,
            'transform-origin': transformOrigin
        }, this._style);
    };
    NzModalComponent.prototype.setClassMap = function () {
        this._maskClassMap = (_a = {},
            _a[this._prefixCls + "-mask"] = true,
            _a[this._prefixCls + "-mask-hidden"] = !this._visible && !this._animationStatus,
            _a['fade-enter'] = this._animationStatus === 'enter',
            _a['fade-enter-active'] = this._animationStatus === 'enter',
            _a['fade-leave'] = this._animationStatus === 'leave',
            _a['fade-leave-active'] = this._animationStatus === 'leave',
            _a);
        this._bodyClassMap = (_b = {},
            _b[this._prefixCls] = true,
            _b['zoom-enter'] = this._animationStatus === 'enter',
            _b['zoom-enter-active'] = this._animationStatus === 'enter',
            _b['zoom-leave'] = this._animationStatus === 'leave',
            _b['zoom-leave-active'] = this._animationStatus === 'leave',
            _b);
        var _a, _b;
    };
    NzModalComponent.prototype.anmiateFade = function (status) {
        var _this = this;
        this._animationStatus = status;
        this.setClassMap();
        setTimeout(function (_) {
            _this._animationStatus = '';
            _this.setClassMap();
            _this.subject.next(status === 'enter' ? 'onShown' : 'onHidden');
            // modal打开后，默认焦点设置到modal上
            if (status === 'enter') {
                _this.contentEl.nativeElement.parentNode.focus();
            }
        }, 200);
    };
    NzModalComponent.prototype.closeFromMask = function (e) {
        if (this._maskClosable && e.target.getAttribute('role') === 'dialog') {
            this.clickCancel(e);
        }
    };
    NzModalComponent.prototype.setConfirmLoading = function (loading) {
        this.nzConfirmLoading = loading;
    };
    NzModalComponent.prototype.open = function () {
        this.nzVisible = true;
    };
    NzModalComponent.prototype.close = function () {
        this.nzVisible = false;
    };
    NzModalComponent.prototype.clickOk = function (e) {
        if (this.nzOnOk) {
            this.nzOnOk.emit(e);
        }
        else {
            this.nzVisible = false;
        }
        this.subject.next('onOk');
    };
    NzModalComponent.prototype.clickCancel = function (e) {
        this.nzOnCancel.emit(e);
        this.subject.next('onCancel');
    };
    NzModalComponent.prototype.ngOnInit = function () {
        this.setClassMap();
        this.setStyles();
    };
    NzModalComponent.prototype.ngAfterViewInit = function () {
        if (this._bodyComponent) {
            var compRef = this.bodyEl.createComponent(this._bodyComponent, null, this._vcr.injector);
            Object.assign(compRef.instance, this._componentParams);
        }
    };
    NzModalComponent.prototype.ngOnDestroy = function () {
        if (this._visible) {
            nzGlobalMonitor.setDocumentOverflowHidden(false);
        }
        this.subject.next('onDestroy');
        this.subject.unsubscribe();
        this.subject = null;
    };
    __decorate([
        ViewChild('modal_content'),
        __metadata("design:type", ElementRef)
    ], NzModalComponent.prototype, "contentEl", void 0);
    __decorate([
        ViewChild('modal_component', { read: ViewContainerRef }),
        __metadata("design:type", ViewContainerRef)
    ], NzModalComponent.prototype, "bodyEl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzModalComponent.prototype, "nzVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzModalComponent.prototype, "nzConfirmLoading", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzModalComponent.prototype, "nzClosable", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzModalComponent.prototype, "nzClass", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzModalComponent.prototype, "nzWidth", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NzModalComponent.prototype, "nzZIndex", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzModalComponent.prototype, "nzTitle", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzModalComponent.prototype, "nzContent", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzModalComponent.prototype, "nzFooter", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzModalComponent.prototype, "nzOkText", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzModalComponent.prototype, "nzCancelText", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzModalComponent.prototype, "nzMaskClosable", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzModalComponent.prototype, "nzStyle", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzModalComponent.prototype, "nzWrapClassName", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzModalComponent.prototype, "nzComponentParams", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NzModalComponent.prototype, "nzVisibleChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NzModalComponent.prototype, "nzOnOk", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NzModalComponent.prototype, "nzOnCancel", void 0);
    __decorate([
        HostListener('keydown.esc', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NzModalComponent.prototype, "onEsc", null);
    NzModalComponent = __decorate([
        Component({
            selector: 'nz-modal',
            viewProviders: [NzModalSubject],
            encapsulation: ViewEncapsulation.None,
            template: "\n    <div [ngClass]=\"_customClass\">\n      <div [ngClass]=\"_maskClassMap\"\n        [style.zIndex]=\"_zIndex\"></div>\n      <div tabindex=\"-1\" role=\"dialog\"\n        [attr.aria-labelledby]=\"modalId\"\n        (click)=\"closeFromMask($event)\"\n        [ngClass]=\"_wrapClass\"\n        [style.zIndex]=\"_zIndex\"\n        [ngStyle]=\"{ 'display': !_visible && !_animationStatus ? 'none' : '' }\">\n\n        <div #modal_content role=\"document\" [ngClass]=\"_bodyClassMap\" [ngStyle]=\"_bodyStyleMap\">\n          <div class=\"ant-modal-content\">\n            <ng-template [ngIf]=\"_closable\">\n              <button aria-label=\"Close\" class=\"ant-modal-close\" (click)=\"clickCancel($event)\">\n                <span class=\"ant-modal-close-x\"></span>\n              </button>\n            </ng-template>\n            <div class=\"ant-modal-header\" *ngIf=\"_title || _titleTpl\">\n              <div class=\"ant-modal-title\" [attr.id]=\"modalId\">\n                <ng-template #defaultTitle>{{ _title }}</ng-template>\n                <ng-template [ngTemplateOutlet]=\"_titleTpl || defaultTitle\"></ng-template>\n              </div>\n            </div>\n            <div class=\"ant-modal-body\">\n              <ng-template #defaultContent>{{ _content }}</ng-template>\n              <ng-template [ngTemplateOutlet]=\"_contentTpl || defaultContent\"></ng-template>\n              <ng-template #modal_component></ng-template>\n            </div>\n            <div class=\"ant-modal-footer\" *ngIf=\"!_footerHide\">\n              <ng-template #defaultFooter>\n                <button nz-button [nzType]=\"'ghost'\" [nzSize]=\"'large'\" (click)=\"clickCancel($event)\">\n                  <span>{{ _cancelText }}</span>\n                </button>\n                <button nz-button [nzType]=\"'primary'\" [nzSize]=\"'large'\" (click)=\"clickOk($event)\" [nzLoading]=\"_confirmLoading\">\n                  <span>{{ _okText }}</span>\n                </button>\n              </ng-template>\n              <ng-template [ngTemplateOutlet]=\"_footerTpl || defaultFooter\"></ng-template>\n            </div>\n          </div>\n        </div>\n        <div tabindex=\"0\" style=\"width: 0px; height: 0px; overflow: hidden;\">sentinel</div>\n      </div>\n    </div>\n  ",
            styleUrls: [
                './style/index.less'
            ]
        }),
        __metadata("design:paramtypes", [NzModalSubject,
            ViewContainerRef,
            NzLocaleService])
    ], NzModalComponent);
    return NzModalComponent;
}());
export { NzModalComponent };
