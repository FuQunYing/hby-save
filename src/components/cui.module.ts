// ---------------------------------------------------------
// | Imports
// ---------------------------------------------------------

// Common of angular
import {ModuleWithProviders, NgModule} from '@angular/core';

// Modules
import {NzGridModule} from './grid/nz-grid.module';
import {NzButtonModule} from './button/nz-button.module';
import {NzMessageModule} from './message/nz-message.module';
import {NzModalModule} from './modal/nz-modal.module';
import {NzStepsModule} from './steps/nz-steps.module';

// Services
import {NzMessageService} from './message/nz-message.service';
import {NzModalSubject} from './modal/nz-modal-subject.service';
import {NzModalService} from './modal/nz-modal.service';

// Tokens (eg. global services' config)
import {NzRootConfig, NZ_ROOT_CONFIG} from './root/nz-root-config';

// ---------------------------------------------------------
// | Exports
// ---------------------------------------------------------

// Mixes

// Modules
export {NzGridModule} from './grid/nz-grid.module';
export {NzButtonModule} from './button/nz-button.module';
export {NzMessageModule} from './message/nz-message.module';
export {NzModalModule} from './modal/nz-modal.module';
export {NzStepsModule} from './steps/nz-steps.module';

// Components
export {NzMessageContainerComponent} from './message/nz-message-container.component';
export {NzMessageComponent} from './message/nz-message.component';
export {NzModalComponent} from './modal/nz-modal.component';
export {NzStepsComponent} from './steps/nz-steps.component';

// Services
export {NzMessageService} from './message/nz-message.service';
export {NzModalService} from './modal/nz-modal.service';
export {NzModalSubject} from './modal/nz-modal-subject.service';

// Tokens (eg. global services' config)
export {NZ_ROOT_CONFIG, NzRootConfig} from './root/nz-root-config';

// ---------------------------------------------------------
// | Root module
// ---------------------------------------------------------

@NgModule({
  exports: [
    NzGridModule,
    NzButtonModule,
    NzMessageModule,
    NzModalModule,
    NzStepsModule
  ]
})
export class CuiModule {

  static forRoot(options?: NzRootConfig): ModuleWithProviders {
    return {
      ngModule: CuiModule,
      providers: [
        NzMessageService,
        {provide: NZ_ROOT_CONFIG, useValue: options},
      ]
    };
  }
}
