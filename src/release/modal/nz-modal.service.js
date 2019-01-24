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
/* tslint:disable:prefer-method-signature no-string-literal */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Type, } from '@angular/core';
import { NzLocaleService } from '../locale/index';
import { NzConfirmComponent } from './nz-confirm.component';
import { ConfirmOptions, ModalOptions } from './nz-modal-options.provider';
import { NzModalComponent } from './nz-modal.component';
var NzModalService = /** @class */ (function () {
    function NzModalService(_appRef, _cfr, _locale) {
        this._appRef = _appRef;
        this._cfr = _cfr;
        this._locale = _locale;
        this._modalCompFactory = this._cfr.resolveComponentFactory(NzModalComponent);
        this._confirmCompFactory = this._cfr.resolveComponentFactory(NzConfirmComponent);
    }
    // TODO: add type checking for this method
    /* tslint:disable-next-line:no-any */
    NzModalService.prototype._initConfig = function (initialConfig, options) {
        if (options === void 0) { options = {}; }
        var props = {};
        var optionalParams = [
            'componentParams',
            'visible',
            'title',
            'content',
            'footer',
            'width',
            'zIndex',
            'okText',
            'cancelText',
            'style',
            'class',
            'onOk',
            'onCancel',
            'closable',
            'maskClosable',
            'wrapClassName',
            'iconType',
            'confirmType',
            'moduleWithComponentFactories'
        ];
        var config = __assign({}, options, initialConfig);
        optionalParams.forEach(function (key) {
            if (config[key] !== undefined) {
                var modalKey = 'nz' + key.replace(/^\w{1}/, function (a) {
                    return a.toLocaleUpperCase();
                });
                props[modalKey] = config[key];
            }
        });
        var isShowConfirmLoading = !!config['showConfirmLoading'];
        props['onOk'] = this._getConfirmCb(props['nzOnOk'], isShowConfirmLoading);
        props['onCancel'] = this._getConfirmCb(props['nzOnCancel']);
        // 在service模式下，不需要nzOnOk，防止触发this.nzOnOk.emit(e);
        delete props['nzOnOk'];
        delete props['nzOnCancel'];
        return props;
    };
    // TODO: add type checking for this method
    /* tslint:disable-next-line:no-any */
    NzModalService.prototype._getConfirmCb = function (fn, isShowConfirmLoading) {
        if (isShowConfirmLoading === void 0) { isShowConfirmLoading = false; }
        return function (_close, _instance) {
            if (isShowConfirmLoading) {
                _instance.nzConfirmLoading = true;
            }
            if (fn) {
                var ret = fn();
                if (!ret) {
                    _close();
                }
                else if (ret.then) {
                    ret.then(_close);
                }
            }
            else {
                _close();
            }
        };
    };
    // TODO: add base class or shared interface for those two component
    NzModalService.prototype._open = function (props, factory) {
        // 在body的内部最前插入一个<nz-modal></nz-modal>方便进行ApplicationRef.bootstrap
        document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);
        // document.body.appendChild(document.createElement(factory.selector));
        var customComponentFactory;
        var compRef;
        var instance;
        var subject;
        if (props['nzContent'] instanceof Type) {
            customComponentFactory = this._cfr.resolveComponentFactory(props['nzContent']);
            // 将编译出来的ngmodule中的用户component的factory作为modal内容存入
            props['nzContent'] = customComponentFactory;
        }
        compRef = this._appRef.bootstrap(factory);
        instance = compRef.instance;
        subject = instance.subject;
        ['onOk', 'onCancel'].forEach(function (eventType) {
            subject.on(eventType, function () {
                var eventHandler = props[eventType];
                if (eventHandler) {
                    eventHandler(function () {
                        instance.nzVisible = false;
                        setTimeout(function () {
                            compRef.destroy();
                        }, 200);
                    }, instance);
                }
            });
        });
        Object.assign(instance, props, {
            nzVisible: true
        });
        return subject;
    };
    // protected createComponentModule (componentType: any) {
    //   @NgModule({
    //     declarations: [ componentType ]
    //   })
    //   class CustomComponentModule {}
    //   return CustomComponentModule;
    // }
    /**
     * Open modal dialog
     */
    NzModalService.prototype.open = function (config) {
        var options = new ModalOptions();
        var props = this._initConfig(config, options);
        return this._open(props, this._modalCompFactory);
    };
    /**
     * Open confirm dialog
     */
    NzModalService.prototype._openConfirm = function (config) {
        var options = new ConfirmOptions();
        var props = this._initConfig(config, options);
        return this._open(props, this._confirmCompFactory);
    };
    /**
     * Open info dialog
     */
    NzModalService.prototype.info = function (props) {
        /* tslint:disable-next-line:no-any */
        var config = __assign({
            confirmType: 'info',
            iconType: 'info-circle'
        }, props);
        return this._openConfirm(config);
    };
    /**
     * Open success dialog
     */
    NzModalService.prototype.success = function (props) {
        /* tslint:disable-next-line:no-any */
        var config = __assign({
            confirmType: 'success',
            iconType: 'check-circle'
        }, props);
        return this._openConfirm(config);
    };
    /**
     * Open error dialog
     */
    NzModalService.prototype.error = function (props) {
        /* tslint:disable-next-line:no-any */
        var config = __assign({
            confirmType: 'error',
            iconType: 'cross-circle'
        }, props);
        return this._openConfirm(config);
    };
    /**
     * Open warning dialog
     */
    NzModalService.prototype.warning = function (props) {
        /* tslint:disable-next-line:no-any */
        var config = __assign({
            confirmType: 'warning',
            iconType: 'exclamation-circle'
        }, props);
        return this._openConfirm(config);
    };
    /**
     * Open confirm dialog
     */
    NzModalService.prototype.confirm = function (props) {
        /* tslint:disable-next-line:no-any */
        var config = __assign({
            confirmType: 'confirm',
            okText: this._locale.translate('Modal.okText'),
            cancelText: this._locale.translate('Modal.cancelText')
        }, props);
        return this._openConfirm(config);
    };
    NzModalService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ApplicationRef,
            ComponentFactoryResolver,
            NzLocaleService])
    ], NzModalService);
    return NzModalService;
}());
export { NzModalService };
