// ---------------------------------------------------------
// | Imports
// ---------------------------------------------------------
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Common of angular
import { NgModule } from '@angular/core';
// Modules
import { NzGridModule } from './grid/nz-grid.module';
import { NzButtonModule } from './button/nz-button.module';
import { NzMessageModule } from './message/nz-message.module';
import { NzModalModule } from './modal/nz-modal.module';
import { NzStepsModule } from './steps/nz-steps.module';
// Services
import { NzMessageService } from './message/nz-message.service';
// Tokens (eg. global services' config)
import { NZ_ROOT_CONFIG } from './root/nz-root-config';
// ---------------------------------------------------------
// | Exports
// ---------------------------------------------------------
// Mixes
// Modules
export { NzGridModule } from './grid/nz-grid.module';
export { NzButtonModule } from './button/nz-button.module';
export { NzMessageModule } from './message/nz-message.module';
export { NzModalModule } from './modal/nz-modal.module';
export { NzStepsModule } from './steps/nz-steps.module';
// Components
export { NzMessageContainerComponent } from './message/nz-message-container.component';
export { NzMessageComponent } from './message/nz-message.component';
export { NzModalComponent } from './modal/nz-modal.component';
export { NzStepsComponent } from './steps/nz-steps.component';
// Services
export { NzMessageService } from './message/nz-message.service';
export { NzModalService } from './modal/nz-modal.service';
export { NzModalSubject } from './modal/nz-modal-subject.service';
// Tokens (eg. global services' config)
export { NZ_ROOT_CONFIG } from './root/nz-root-config';
// ---------------------------------------------------------
// | Root module
// ---------------------------------------------------------
var CuiModule = /** @class */ (function () {
    function CuiModule() {
    }
    CuiModule_1 = CuiModule;
    CuiModule.forRoot = function (options) {
        return {
            ngModule: CuiModule_1,
            providers: [
                NzMessageService,
                { provide: NZ_ROOT_CONFIG, useValue: options },
            ]
        };
    };
    CuiModule = CuiModule_1 = __decorate([
        NgModule({
            exports: [
                NzGridModule,
                NzButtonModule,
                NzMessageModule,
                NzModalModule,
                NzStepsModule
            ]
        })
    ], CuiModule);
    return CuiModule;
    var CuiModule_1;
}());
export { CuiModule };
