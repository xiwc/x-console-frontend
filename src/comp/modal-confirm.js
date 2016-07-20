import { bindable } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/*
 * 操作确认窗口
 */
export class ModalConfirm {

    @bindable title = ''; // 窗口标题

    @bindable content = ''; // 窗口提示消息内容

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    static inject = [I18N];
    constructor(I18N) { // 通过构造函数注入
        let _this = this;
        _this.i18n = I18N;
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
