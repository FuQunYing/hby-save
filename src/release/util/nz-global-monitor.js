import { EventEmitter } from '@angular/core';
var NzGlobalMonitorService = /** @class */ (function () {
    function NzGlobalMonitorService() {
        this.counter = 0;
        this.lastClickPos = {
            x: 0,
            y: 0
        };
        this._navItemSource = new EventEmitter();
        this._observeGlobalEvents();
    }
    NzGlobalMonitorService.prototype.getGlobalCount = function () {
        return ++this.counter;
    };
    NzGlobalMonitorService.prototype.setDocumentOverflowHidden = function (status) {
        document.body.style.overflow = status ? 'hidden' : '';
    };
    NzGlobalMonitorService.prototype._observeGlobalEvents = function () {
        var _this = this;
        // 监听document的点击事件，记录点击坐标，并抛出 documentClick 事件
        document.addEventListener('click', function (e) {
            _this.lastClickPos = {
                x: e.clientX,
                y: e.clientY
            };
            _this._navItemSource.emit('documentClick');
        });
    };
    return NzGlobalMonitorService;
}());
export { NzGlobalMonitorService };
export default new NzGlobalMonitorService();
