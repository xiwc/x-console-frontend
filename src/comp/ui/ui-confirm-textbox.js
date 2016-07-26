import {
    bindable
}
from 'aurelia-framework';
/*
 * 操作确认窗口
 */
export class UiConfirmTextbox {

    @bindable title = ''; // 窗口标题

    @bindable text = ''; // 文本框初始值

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    constructor() { // 通过构造函数注入
    }

    attached() {

        $(this.mdLogout).modal({
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

        if (onapprove) {
            this.onapprove = onapprove;
        }

        if (ondeny) {
            this.ondeny = ondeny;
        }

        $(this.mdLogout).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.mdLogout).modal('hide');
    }

}
