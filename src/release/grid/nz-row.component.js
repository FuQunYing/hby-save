var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Renderer2, ViewEncapsulation, } from '@angular/core';
var NzRowComponent = /** @class */ (function () {
    function NzRowComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._classList = [];
        this._prefixCls = 'ant-row';
        this._align = 'top';
        this._justify = 'start';
        this._el = this._elementRef.nativeElement;
    }
    Object.defineProperty(NzRowComponent.prototype, "nzType", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRowComponent.prototype, "nzAlign", {
        get: function () {
            return this._align;
        },
        set: function (value) {
            this._align = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRowComponent.prototype, "nzJustify", {
        get: function () {
            return this._justify;
        },
        set: function (value) {
            this._justify = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRowComponent.prototype, "nzGutter", {
        get: function () {
            return this._gutter;
        },
        set: function (value) {
            this._gutter = value;
            this.setStyle();
        },
        enumerable: true,
        configurable: true
    });
    NzRowComponent.prototype.setStyle = function () {
        this._renderer.setStyle(this._el, 'margin-left', "-" + this._gutter / 2 + "px");
        this._renderer.setStyle(this._el, 'margin-right', "-" + this._gutter / 2 + "px");
    };
    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
    NzRowComponent.prototype.setClassMap = function () {
        var _this = this;
        this._classList.forEach(function (_className) {
            _this._renderer.removeClass(_this._el, _className);
        });
        this._classList = [
            (!this.nzType) && this._prefixCls,
            this.nzType && this._prefixCls + "-" + this.nzType,
            this.nzType && this.nzAlign && this._prefixCls + "-" + this.nzType + "-" + this.nzAlign,
            this.nzType && this.nzJustify && this._prefixCls + "-" + this.nzType + "-" + this.nzJustify
        ].filter(function (item) {
            return !!item;
        });
        this._classList.forEach(function (_className) {
            _this._renderer.addClass(_this._el, _className);
        });
    };
    NzRowComponent.prototype.ngOnInit = function () {
        this.setClassMap();
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzRowComponent.prototype, "nzType", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzRowComponent.prototype, "nzAlign", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzRowComponent.prototype, "nzJustify", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NzRowComponent.prototype, "nzGutter", null);
    NzRowComponent = __decorate([
        Component({
            selector: '[nz-row],nz-row',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <ng-content></ng-content>\n  ",
            styleUrls: [
                './style/index.less'
            ]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], NzRowComponent);
    return NzRowComponent;
}());
export { NzRowComponent };
