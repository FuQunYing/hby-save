import { InjectionToken } from '@angular/core';
export var NZ_MESSAGE_DEFAULT_CONFIG = new InjectionToken('NZ_MESSAGE_DEFAULT_CONFIG');
export var NZ_MESSAGE_CONFIG = new InjectionToken('NZ_MESSAGE_CONFIG');
export var NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER = {
    provide: NZ_MESSAGE_DEFAULT_CONFIG,
    useValue: {
        nzDuration: 1500,
        nzAnimate: false,
        nzPauseOnHover: true,
        nzMaxStack: 1,
    }
};
