import { InjectionToken } from '@angular/core';
export var NZ_ROOT_CONFIG = new InjectionToken('NzRootConfig');
export function createNzRootInitializer(document, options) {
    return function nzRootInitializer() {
        if (options) {
            var style = document.createElement('style');
            style.innerHTML = "\n        @font-face {\n          font-family: '" + options.extraFontName + "';\n          src: url('" + options.extraFontUrl + ".eot'); /* IE9*/\n          src:\n            /* IE6-IE8 */\n            url('" + options.extraFontUrl + ".eot?#iefix') format('embedded-opentype'),\n            /* chrome\u3001firefox */\n            url('" + options.extraFontUrl + ".woff') format('woff'),\n            /* chrome\u3001firefox\u3001opera\u3001Safari, Android, iOS 4.2+*/\n            url('" + options.extraFontUrl + ".ttf') format('truetype'),\n            /* iOS 4.1- */\n            url('" + options.extraFontUrl + ".svg#iconfont') format('svg');\n        }\n      ";
            document.head.appendChild(style);
        }
    };
}
