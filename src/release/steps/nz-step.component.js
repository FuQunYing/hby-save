var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
var NzStepComponent = /** @class */ (function () {
    function NzStepComponent(erf, _renderer, cdr) {
        this.erf = erf;
        this._renderer = _renderer;
        this.cdr = cdr;
        this._status = 'wait';
        this._ifCustomStatus = false;
        this._totalCount = 1;
        this._currentIndex = 0;
        this._last = false;
        this._first = false;
        this._processDot = false;
        this._direction = 'horizontal';
        this._outStatus = 'process';
        this.index = 0;
        this._description = '';
        this._el = erf.nativeElement;
    }
    Object.defineProperty(NzStepComponent.prototype, "nzStatus", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
            this._ifCustomStatus = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzStepComponent.prototype, "nzDescription", {
        set: function (value) {
            if (value instanceof TemplateRef) {
                this._descriptionTpl = value;
            }
            else {
                this._description = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzStepComponent.prototype, "_current", {
        get: function () {
            return this._currentIndex;
        },
        set: function (current) {
            this._currentIndex = current;
            if (!this._ifCustomStatus) {
                if (current > this.index) {
                    this._status = 'finish';
                }
                else if (current === this.index) {
                    if (this._outStatus) {
                        this._status = 'error';
                    }
                    else {
                        this._status = 'process';
                    }
                }
                else {
                    this._status = 'wait';
                }
            }
            this.initClassMap();
        },
        enumerable: true,
        configurable: true
    });
    NzStepComponent.prototype.initClassMap = function () {
        this.stepStatusClass = (_a = {},
            _a['ant-steps-item'] = true,
            _a["ant-steps-status-wait"] = this._status === 'wait',
            _a["ant-steps-status-process"] = this._status === 'process',
            _a["ant-steps-status-finish"] = this._status === 'finish',
            _a["ant-steps-status-error"] = this._status === 'error',
            _a['ant-steps-item-last'] = this._last,
            _a['ant-steps-custom'] = !!this.nzIcon,
            _a['ant-steps-next-error'] = (this._outStatus === 'error' && this._current === this.index - 1),
            _a);
        for (var i in this.stepStatusClass) {
            if (this.stepStatusClass[i]) {
                this._renderer.addClass(this._el, i);
            }
            else {
                this._renderer.removeClass(this._el, i);
            }
        }
        var _a;
    };
    NzStepComponent.prototype.updateLastWidth = function () {
        var width = this._stepsHead.nativeElement.offsetWidth + this._stepsMain.nativeElement.offsetWidth;
        /** remove left padding if not first**/
        if (!this._first) {
            width = width - 10;
        }
        // this._renderer.setStyle(this.erf.nativeElement, 'width', (100 / (this._totalCount - 1)) + '%');
        // this._renderer.setStyle(this.erf.nativeElement, 'margin-right', (-(width / (this._totalCount - 1) + 5)) + 'px');
        if (this._direction === 'horizontal') {
            if (this._stepsTail && this._stepsTail.nativeElement) {
                this._renderer.setStyle(this._stepsTail.nativeElement, 'padding-right', ((width / (this._totalCount - 1) + 5)) + 'px');
            }
        }
    };
    NzStepComponent.prototype.ngAfterViewInit = function () {
        if (!this._last) {
            this.updateLastWidth();
        }
    };
    __decorate([
        ContentChild('nzIcon'),
        __metadata("design:type", TemplateRef)
    ], NzStepComponent.prototype, "nzIcon", void 0);
    __decorate([
        ViewChild('stepsTail'),
        __metadata("design:type", ElementRef)
    ], NzStepComponent.prototype, "_stepsTail", void 0);
    __decorate([
        ViewChild('stepsHead'),
        __metadata("design:type", ElementRef)
    ], NzStepComponent.prototype, "_stepsHead", void 0);
    __decorate([
        ViewChild('stepsMain'),
        __metadata("design:type", ElementRef)
    ], NzStepComponent.prototype, "_stepsMain", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzStepComponent.prototype, "nzStatus", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NzStepComponent.prototype, "nzTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NzStepComponent.prototype, "nzDescription", null);
    NzStepComponent = __decorate([
        Component({
            selector: 'nz-step',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <div class=\"ant-steps-tail\" #stepsTail *ngIf=\"_last !== true\">\n      <i></i>\n    </div>\n    <div class=\"ant-steps-step\">\n      <div class=\"ant-steps-head\" #stepsHead>\n        <div class=\"ant-steps-head-inner\">\n          <ng-template [ngIf]=\"!_processDot\">\n            <span class=\"ant-steps-icon anticon anticon-check\" *ngIf=\"_status === 'finish' && !nzIcon\"></span>\n            <span class=\"ant-steps-icon anticon anticon-cross\" *ngIf=\"_status === 'error'\"></span>\n            <span class=\"ant-steps-icon\" *ngIf=\"(_status === 'process' || _status === 'wait') && !nzIcon\">{{ index + 1 }}</span>\n            <span class=\"ant-steps-icon\" *ngIf=\"nzIcon\">\n            <ng-template [ngTemplateOutlet]=\"nzIcon\"></ng-template>\n          </span>\n          </ng-template>\n          <ng-template [ngIf]=\"_processDot\">\n            <span class=\"ant-steps-icon\">\n              <span class=\"ant-steps-icon-dot\"></span>\n            </span>\n          </ng-template>\n        </div>\n      </div>\n      <div class=\"ant-steps-main\" #stepsMain>\n        <div class=\"ant-steps-title\" [innerHTML]=\"nzTitle\"></div>\n        <div class=\"ant-steps-description\">\n          <ng-container *ngIf=\"_description; else _descriptionTpl\">{{ _description }}</ng-container>\n        </div>\n      </div>\n    </div>\n  ",
            styleUrls: [
                './style/index.less',
                './style/patch.less'
            ]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, ChangeDetectorRef])
    ], NzStepComponent);
    return NzStepComponent;
}());
export { NzStepComponent };
