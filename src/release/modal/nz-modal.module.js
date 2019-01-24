var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from '../button/nz-button.module';
import { NzLocaleModule } from '../locale/index';
import { NzConfirmComponent } from './nz-confirm.component';
import { NzModalSubject } from './nz-modal-subject.service';
import { NzModalComponent } from './nz-modal.component';
import { NzModalService } from './nz-modal.service';
var NzModalModule = /** @class */ (function () {
    function NzModalModule() {
    }
    NzModalModule = __decorate([
        NgModule({
            entryComponents: [NzModalComponent, NzConfirmComponent],
            providers: [NzModalSubject, NzModalService],
            declarations: [NzModalComponent, NzConfirmComponent],
            exports: [NzModalComponent, NzConfirmComponent],
            imports: [CommonModule, NzLocaleModule, NzButtonModule]
        })
    ], NzModalModule);
    return NzModalModule;
}());
export { NzModalModule };
