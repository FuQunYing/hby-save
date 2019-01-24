var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageComponent } from './nz-message.component';
var providers = [
    NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER
];
var NzMessageModule = /** @class */ (function () {
    function NzMessageModule() {
    }
    NzMessageModule = __decorate([
        NgModule({
            imports: [CommonModule, OverlayModule],
            declarations: [NzMessageContainerComponent, NzMessageComponent],
            providers: providers,
            entryComponents: [NzMessageContainerComponent]
        })
    ], NzMessageModule);
    return NzMessageModule;
}());
export { NzMessageModule };
