import { ModuleWithProviders } from '@angular/core';
import { NzRootConfig } from './root/nz-root-config';
export { NzGridModule } from './grid/nz-grid.module';
export { NzButtonModule } from './button/nz-button.module';
export { NzMessageModule } from './message/nz-message.module';
export { NzModalModule } from './modal/nz-modal.module';
export { NzStepsModule } from './steps/nz-steps.module';
export { NzMessageContainerComponent } from './message/nz-message-container.component';
export { NzMessageComponent } from './message/nz-message.component';
export { NzModalComponent } from './modal/nz-modal.component';
export { NzStepsComponent } from './steps/nz-steps.component';
export { NzMessageService } from './message/nz-message.service';
export { NzModalService } from './modal/nz-modal.service';
export { NzModalSubject } from './modal/nz-modal-subject.service';
export { NZ_ROOT_CONFIG, NzRootConfig } from './root/nz-root-config';
export declare class CuiModule {
    static forRoot(options?: NzRootConfig): ModuleWithProviders;
}
