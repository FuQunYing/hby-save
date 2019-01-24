var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, HostListener, Input, Renderer2, ViewEncapsulation, } from '@angular/core';
import { toBoolean } from '../util/convert';
var NzButtonComponent = /** @class */ (function () {
    function NzButtonComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ghost = false;
        this._loading = false;
        this._classList = [];
        this._iconOnly = false;
        this._clicked = false;
        this._prefixCls = 'ant-btn';
        this._sizeMap = { large: 'lg', small: 'sm' };
        this._el = this._elementRef.nativeElement;
        this.nativeElement = this._elementRef.nativeElement;
        this._renderer.addClass(this._el, this._prefixCls);
    }
    Object.defineProperty(NzButtonComponent.prototype, "nzGhost", {
        get: function () {
            return this._ghost;
        },
        set: function (value) {
            this._ghost = toBoolean(value);
            this._setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzButtonComponent.prototype, "nzType", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this._setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzButtonComponent.prototype, "nzShape", {
        get: function () {
            return this._shape;
        },
        set: function (value) {
            this._shape = value;
            this._setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzButtonComponent.prototype, "nzSize", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this._setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzButtonComponent.prototype, "nzLoading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            this._loading = toBoolean(value);
            this._setClassMap();
            this._setIconDisplay(value);
        },
        enumerable: true,
        configurable: true
    });
    /** toggle button clicked animation */
    NzButtonComponent.prototype._onClick = function () {
        var _this = this;
        this._clicked = true;
        this._setClassMap();
        setTimeout(function () {
            _this._clicked = false;
            _this._setClassMap();
        }, 300);
    };
    NzButtonComponent.prototype._setIconDisplay = function (value) {
        var innerI = this._iconElement;
        if (innerI) {
            this._renderer.setStyle(innerI, 'display', value ? 'none' : 'inline-block');
        }
    };
    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
    NzButtonComponent.prototype._setClassMap = function () {
        var _this = this;
        this._classList.forEach(function (_className) {
            _this._renderer.removeClass(_this._el, _className);
        });
        this._classList = [
            this.nzType && this._prefixCls + "-" + this.nzType,
            this.nzShape && this._prefixCls + "-" + this.nzShape,
            this._sizeMap[this.nzSize] && this._prefixCls + "-" + this._sizeMap[this.nzSize],
            this.nzLoading && this._prefixCls + "-loading",
            this._clicked && this._prefixCls + "-clicked",
            this._iconOnly && this._prefixCls + "-icon-only",
            this.nzGhost && this._prefixCls + "-background-ghost",
        ].filter(function (item) {
            return !!item;
        });
        this._classList.forEach(function (_className) {
            _this._renderer.addClass(_this._el, _className);
        });
    };
    NzButtonComponent.prototype.ngAfterContentInit = function () {
        this._iconElement = this._innerIElement;
        /** check if host children only has i element */
        if (this._iconElement && this._el.children.length === 1 && (this._iconElement.isEqualNode(this._el.children[0]))) {
            this._iconOnly = true;
            this._setClassMap();
        }
        this._setIconDisplay(this.nzLoading);
    };
    Object.defineProperty(NzButtonComponent.prototype, "_innerIElement", {
        get: function () {
            return this._el.querySelector('i');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzButtonComponent.prototype, "nzGhost", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzButtonComponent.prototype, "nzType", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzButtonComponent.prototype, "nzShape", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzButtonComponent.prototype, "nzSize", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzButtonComponent.prototype, "nzLoading", null);
    __decorate([
        HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NzButtonComponent.prototype, "_onClick", null);
    NzButtonComponent = __decorate([
        Component({
            selector: '[nz-button]',
            encapsulation: ViewEncapsulation.None,
            templateUrl: './nz-button.component.html',
            styleUrls: [
                './style/index.less'
            ]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], NzButtonComponent);
    return NzButtonComponent;
}());
export { NzButtonComponent };
