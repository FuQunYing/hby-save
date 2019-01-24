var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChildren, Input, QueryList, ViewEncapsulation, } from '@angular/core';
import { toBoolean } from '../util/convert';
import { NzStepComponent } from './nz-step.component';
var NzStepsComponent = /** @class */ (function () {
    function NzStepsComponent() {
        this._progressDot = false;
        this._status = 'process';
        this._current = 0;
        this._afterViewInit = false;
        this._direction = 'horizontal';
    }
    Object.defineProperty(NzStepsComponent.prototype, "nzDirection", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
            this.updateChildrenSteps();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzStepsComponent.prototype, "nzProgressDot", {
        get: function () {
            return this._progressDot;
        },
        set: function (value) {
            this._progressDot = toBoolean(value);
            this.updateChildrenSteps();
            this.setDirectionClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzStepsComponent.prototype, "nzStatus", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
            this.updateChildrenSteps();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzStepsComponent.prototype, "nzCurrent", {
        get: function () {
            return this._current;
        },
        set: function (current) {
            this._current = current;
            this.updateChildrenSteps();
        },
        enumerable: true,
        configurable: true
    });
    NzStepsComponent.prototype.setDirectionClass = function () {
        this._stepsClassMap = (_a = {},
            _a["ant-steps-" + this.nzDirection] = true,
            _a["ant-steps-label-" + this.nzDirection] = true,
            _a["ant-steps-dot"] = this.nzProgressDot,
            _a['ant-steps-small'] = this.nzSize === 'small',
            _a);
        var _a;
    };
    NzStepsComponent.prototype.updateChildrenSteps = function () {
        var _this = this;
        setTimeout(function () {
            _this.steps.toArray().forEach(function (step, index, arr) {
                step._outStatus = _this.nzStatus;
                step._processDot = _this.nzProgressDot;
                step._direction = _this.nzDirection;
                step.index = index;
                step._totalCount = arr.length;
                step._current = _this.nzCurrent;
                step._first = index === 0;
                if (arr.length === index + 1) {
                    step._last = true;
                }
                else {
                    step._last = false;
                    step.updateLastWidth();
                }
                if (_this.nzCurrent === step.index) {
                    step._status = _this.nzStatus;
                }
                step.initClassMap();
            });
        });
    };
    NzStepsComponent.prototype.ngOnInit = function () {
        this.setDirectionClass();
    };
    NzStepsComponent.prototype.ngOnDestroy = function () {
        if (this._stepsChanges) {
            this._stepsChanges.unsubscribe();
            this._stepsChanges = null;
        }
    };
    NzStepsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._afterViewInit = true;
        });
        this.updateChildrenSteps();
        if (this.steps) {
            this._stepsChanges = this.steps.changes.subscribe(function () {
                _this.updateChildrenSteps();
            });
        }
    };
    __decorate([
        ContentChildren(NzStepComponent),
        __metadata("design:type", QueryList)
    ], NzStepsComponent.prototype, "steps", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzStepsComponent.prototype, "nzDirection", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NzStepsComponent.prototype, "nzSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NzStepsComponent.prototype, "nzProgressDot", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NzStepsComponent.prototype, "nzStatus", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NzStepsComponent.prototype, "nzCurrent", null);
    NzStepsComponent = __decorate([
        Component({
            selector: 'nz-steps',
            encapsulation: ViewEncapsulation.None,
            template: "\n    <div class=\"ant-steps\" [ngClass]=\"_stepsClassMap\" [hidden]=\"!_afterViewInit\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styleUrls: [
                './style/index.less'
            ]
        })
    ], NzStepsComponent);
    return NzStepsComponent;
}());
export { NzStepsComponent };
