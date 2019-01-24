var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
var NzButtonGroupComponent = /** @class */ (function () {
    function NzButtonGroupComponent() {
        this._prefixCls = 'ant-btn-group';
        this._sizeMap = { large: 'lg', small: 'sm' };
        this._classMap = (_a = {},
            _a[this._prefixCls] = true,
            _a[this._prefixCls + "-" + this._sizeMap[this.nzSize]] = this._sizeMap[this.nzSize],
            _a);
        var _a;
    }
    Object.defineProperty(NzButtonGroupComponent.prototype, "nzSize", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this._classMap = (_a = {},
                _a[this._prefixCls] = true,
                _a[this._prefixCls + "-" + this._sizeMap[this.nzSize]] = this._sizeMap[this.nzSize],
                _a);
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    NzButtonGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        /** trim text node between button */
        Array.from(this._groupWrapper.nativeElement.childNodes).forEach(function (node) {
            if (node.nodeType === 3) {
                _this._groupWrapper.nativeElement.removeChild(node);
            }
        });
    };
    __decorate([
        ViewChild('groupWrapper'),
        __metadata("design:type", ElementRef)
    ], NzButtonGroupComponent.prototype, "_groupWrapper", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzButtonGroupComponent.prototype, "nzSize", null);
    NzButtonGroupComponent = __decorate([
        Component({
            selector: 'nz-button-group',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <div [ngClass]=\"_classMap\" #groupWrapper>\n      <ng-content></ng-content>\n    </div>\n  ",
            styleUrls: []
        })
    ], NzButtonGroupComponent);
    return NzButtonGroupComponent;
}());
export { NzButtonGroupComponent };
