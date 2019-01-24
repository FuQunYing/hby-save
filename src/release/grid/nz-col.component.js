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
import { Component, ElementRef, Host, HostBinding, Input, Optional, Renderer2, } from '@angular/core';
import { isNotNil } from '../util/check';
import { NzRowComponent } from './nz-row.component';
var EmbeddedProperty = /** @class */ (function () {
    function EmbeddedProperty() {
    }
    return EmbeddedProperty;
}());
export { EmbeddedProperty };
var NzColComponent = /** @class */ (function () {
    function NzColComponent(_elementRef, _nzRow, _renderer) {
        this._elementRef = _elementRef;
        this._nzRow = _nzRow;
        this._renderer = _renderer;
        this._classList = [];
        this._prefixCls = 'ant-col';
        this._el = this._elementRef.nativeElement;
    }
    Object.defineProperty(NzColComponent.prototype, "paddingLeft", {
        get: function () {
            return this._nzRow && this._nzRow._gutter / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzColComponent.prototype, "paddingRight", {
        get: function () {
            return this._nzRow && this._nzRow._gutter / 2;
        },
        enumerable: true,
        configurable: true
    });
    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
    NzColComponent.prototype.setClassMap = function () {
        var _this = this;
        this._classList.forEach(function (_className) {
            _this._renderer.removeClass(_this._el, _className);
        });
        this._classList = [
            isNotNil(this.nzSpan) && this._prefixCls + "-" + this.nzSpan,
            isNotNil(this.nzOrder) && this._prefixCls + "-order-" + this.nzOrder,
            isNotNil(this.nzOffset) && this._prefixCls + "-offset-" + this.nzOffset,
            isNotNil(this.nzPull) && this._prefixCls + "-pull-" + this.nzPull,
            isNotNil(this.nzPush) && this._prefixCls + "-push-" + this.nzPush
        ].concat(this.generateClass());
        this._classList = this._classList.filter(function (item) {
            return !!item;
        });
        this._classList.forEach(function (_className) {
            _this._renderer.addClass(_this._el, _className);
        });
    };
    NzColComponent.prototype.generateClass = function () {
        var _this = this;
        var listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl'];
        var listOfClassName = [];
        listOfSizeInputName.forEach(function (name) {
            var sizeName = name.replace('nz', '').toLowerCase();
            if (isNotNil(_this[name])) {
                if ((typeof (_this[name]) === 'number') || (typeof (_this[name]) === 'string')) {
                    listOfClassName.push(_this._prefixCls + "-" + sizeName + "-" + _this[name]);
                }
                else {
                    listOfClassName.push(_this[name] && isNotNil(_this[name].span) && _this._prefixCls + "-" + sizeName + "-" + _this[name].span);
                    listOfClassName.push(_this[name] && isNotNil(_this[name].pull) && _this._prefixCls + "-" + sizeName + "-pull-" + _this[name].pull);
                    listOfClassName.push(_this[name] && isNotNil(_this[name].push) && _this._prefixCls + "-" + sizeName + "-push-" + _this[name].push);
                    listOfClassName.push(_this[name] && isNotNil(_this[name].offset) && _this._prefixCls + "-" + sizeName + "-offset-" + _this[name].offset);
                    listOfClassName.push(_this[name] && isNotNil(_this[name].order) && _this._prefixCls + "-" + sizeName + "-order-" + _this[name].order);
                }
            }
        });
        return listOfClassName;
    };
    NzColComponent.prototype.ngOnChanges = function (changes) {
        this.setClassMap();
    };
    NzColComponent.prototype.ngOnInit = function () {
        this.setClassMap();
    };
    __decorate([
        HostBinding('style.padding-left.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], NzColComponent.prototype, "paddingLeft", null);
    __decorate([
        HostBinding('style.padding-right.px'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [])
    ], NzColComponent.prototype, "paddingRight", null);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NzColComponent.prototype, "nzSpan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NzColComponent.prototype, "nzOrder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NzColComponent.prototype, "nzOffset", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NzColComponent.prototype, "nzPush", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NzColComponent.prototype, "nzPull", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NzColComponent.prototype, "nzXs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NzColComponent.prototype, "nzSm", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NzColComponent.prototype, "nzMd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NzColComponent.prototype, "nzLg", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NzColComponent.prototype, "nzXl", void 0);
    NzColComponent = __decorate([
        Component({
            selector: 'nz-col',
            template: "\n    <ng-content></ng-content>\n  ",
            styles: []
        }),
        __param(1, Optional()), __param(1, Host()),
        __metadata("design:paramtypes", [ElementRef, NzRowComponent, Renderer2])
    ], NzColComponent);
    return NzColComponent;
}());
export { NzColComponent };
