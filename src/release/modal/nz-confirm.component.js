var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, HostListener, Input, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';
import nzGlobalMonitor from '../util/nz-global-monitor';
import { NzModalSubject } from './nz-modal-subject.service';
var NzConfirmComponent = /** @class */ (function () {
    function NzConfirmComponent(subject, _locale) {
        this.subject = subject;
        this._locale = _locale;
        this._maskClosable = true;
        this._confirmLoading = false;
        this._visible = false;
        this._prefixCls = 'ant-modal';
        this._prefixConfirmCls = 'ant-confirm';
        this._width = '416px';
        this._zIndex = 1000;
        this._iconTypeCls = 'anticon anticon-question-circle';
        this._title = '';
        this._content = '';
        this._okText = this._locale.translate('Modal.understood');
        this._cancelText = '';
        this._animationStatus = '';
        this._customClass = '';
        this._typeCls = this._prefixConfirmCls + "-confirm";
    }
    Object.defineProperty(NzConfirmComponent.prototype, "nzVisible", {
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
                }, 10);
            }
            else {
                this.anmiateFade('leave');
                this.subject.next('onHide');
            }
            this._visible = visible;
            // 设置全局的overflow样式
            nzGlobalMonitor.setDocumentOverflowHidden(visible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzWidth", {
        set: function (value) {
            this._width = typeof value === 'number' ? value + 'px' : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzClass", {
        set: function (value) {
            this._customClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzZIndex", {
        set: function (value) {
            this._zIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzTitle", {
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
    Object.defineProperty(NzConfirmComponent.prototype, "nzContent", {
        set: function (value) {
            if (value instanceof TemplateRef) {
                this._contentTpl = value;
            }
            else {
                this._content = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzMaskClosable", {
        set: function (value) {
            this._maskClosable = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzOkText", {
        set: function (value) {
            this._okText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzCancelText", {
        set: function (value) {
            this._cancelText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzIconType", {
        set: function (value) {
            if (value) {
                this._iconTypeCls = "anticon anticon-" + value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzConfirmType", {
        set: function (value) {
            if (value) {
                this._typeCls = this._prefixConfirmCls + "-" + value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzConfirmComponent.prototype, "nzConfirmLoading", {
        set: function (value) {
            this._confirmLoading = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    NzConfirmComponent.prototype.onEsc = function (e) {
        if (this._maskClosable) {
            this.subject.next('onCancel');
        }
    };
    NzConfirmComponent.prototype.onEnter = function (e) {
        this.subject.next('onOk');
    };
    NzConfirmComponent.prototype.setStyles = function (origin) {
        var el = this.contentEl.nativeElement;
        var transformOrigin = origin ? origin.x - el.offsetLeft + "px " + (origin.y - el.offsetTop) + "px 0px" : '';
        this._bodyStyleMap = {
            'width': this._width,
            'transform-origin': transformOrigin
        };
    };
    NzConfirmComponent.prototype.setClassMap = function () {
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
            _b[this._prefixConfirmCls] = true,
            _b[this._typeCls] = true,
            _b['zoom-enter'] = this._animationStatus === 'enter',
            _b['zoom-enter-active'] = this._animationStatus === 'enter',
            _b['zoom-leave'] = this._animationStatus === 'leave',
            _b['zoom-leave-active'] = this._animationStatus === 'leave',
            _b);
        var _a, _b;
    };
    NzConfirmComponent.prototype.anmiateFade = function (status) {
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
    NzConfirmComponent.prototype.closeFromMask = function (e) {
        if (this._maskClosable && e.target.getAttribute('role') === 'dialog') {
            this.subject.next('onCancel');
        }
    };
    // 通过createComponent方法创建component时，ngOnInit不会被触发
    NzConfirmComponent.prototype.ngOnInit = function () {
        this.setClassMap();
        this.setStyles();
    };
    NzConfirmComponent.prototype.ngOnDestroy = function () {
        if (this._visible) {
            nzGlobalMonitor.setDocumentOverflowHidden(false);
        }
        this.subject.next('onDestroy');
        this.subject.unsubscribe();
        this.subject = null;
    };
    __decorate([
        ViewChild('confirm_content'),
        __metadata("design:type", ElementRef)
    ], NzConfirmComponent.prototype, "contentEl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzConfirmComponent.prototype, "nzVisible", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzConfirmComponent.prototype, "nzWidth", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzConfirmComponent.prototype, "nzClass", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NzConfirmComponent.prototype, "nzZIndex", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzConfirmComponent.prototype, "nzTitle", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzConfirmComponent.prototype, "nzContent", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzConfirmComponent.prototype, "nzMaskClosable", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzConfirmComponent.prototype, "nzOkText", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzConfirmComponent.prototype, "nzCancelText", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzConfirmComponent.prototype, "nzIconType", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzConfirmComponent.prototype, "nzConfirmType", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzConfirmComponent.prototype, "nzConfirmLoading", null);
    __decorate([
        HostListener('keydown.esc', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NzConfirmComponent.prototype, "onEsc", null);
    __decorate([
        HostListener('keydown.enter', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NzConfirmComponent.prototype, "onEnter", null);
    NzConfirmComponent = __decorate([
        Component({
            selector: 'nz-confirm',
            viewProviders: [NzModalSubject],
            encapsulation: ViewEncapsulation.None,
            template: "\n    <div [ngClass]=\"_customClass\">\n      <div [ngClass]=\"_maskClassMap\"\n        [style.zIndex]=\"_zIndex\"></div>\n      <div tabindex=\"-1\" role=\"dialog\"\n        (click)=\"closeFromMask($event)\"\n        class=\"ant-modal-wrap\"\n        [style.zIndex]=\"_zIndex\"\n        [ngStyle]=\"{ 'display': !_visible && !_animationStatus ? 'none' : 'block' }\">\n\n        <div #confirm_content role=\"document\" [ngClass]=\"_bodyClassMap\" [ngStyle]=\"_bodyStyleMap\">\n          <div class=\"ant-modal-content\">\n            <div class=\"ant-modal-body\">\n              <div style=\"zoom: 1; overflow: hidden;\">\n                <div class=\"ant-confirm-body\">\n                  <!--<i [ngClass]=\"_iconTypeCls\"></i>-->\n                  <span class=\"ant-confirm-title\">\n                    <ng-template #defaultTitle>{{ _title }}</ng-template>\n                    <ng-template [ngTemplateOutlet]=\"_titleTpl || defaultTitle\"></ng-template>\n                  </span>\n                  <div class=\"ant-confirm-content\">\n                    <ng-template #defaultContent>\n                      <div [innerHTML]=\"_content\"></div>\n                    </ng-template>\n                    <ng-template [ngTemplateOutlet]=\"_contentTpl || defaultContent\"></ng-template>\n                  </div>\n                </div>\n                <div class=\"ant-confirm-btns\">\n                  <ng-template [ngIf]=\"_cancelText\">\n                    <button nz-button [nzType]=\"'ghost'\" [nzSize]=\"'large'\" (click)=\"subject.next('onCancel')\">\n                      <span>{{ _cancelText }}</span>\n                    </button>\n                  </ng-template>\n                  <button nz-button #confirm_ok_btn [nzType]=\"'primary'\" [nzSize]=\"'large'\" [nzSize]=\"'large'\" (click)=\"subject.next('onOk')\" [nzLoading]=\"_confirmLoading\">\n                    <span>{{ _okText }}</span>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div tabindex=\"0\" style=\"width: 0px; height: 0px; overflow: hidden;\">sentinel</div>\n      </div>\n    </div>\n  ",
            styleUrls: [
                './style/index.less'
            ]
        }),
        __metadata("design:paramtypes", [NzModalSubject, NzLocaleService])
    ], NzConfirmComponent);
    return NzConfirmComponent;
}());
export { NzConfirmComponent };
