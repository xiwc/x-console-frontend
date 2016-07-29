import {
    bindable
}
from 'aurelia-framework';

export class UiSnapshotRecoverModal {

    constructor() { // 通过构造函数注入
    }

    attached() {

        $(this.md).modal({
            closable: false,
            onApprove: () => {
                this.onapprove && this.onapprove();
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });
    }

    /**
     * 显示确认窗口
     * @param onapprove: 确认回调函数
     * @param ondeny: 取消回调函数
     */
    show(onapprove, ondeny) {

        this.onapprove = onapprove;
        this.ondeny = ondeny;

        $(this.md).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.md).modal('hide');
    }

}
