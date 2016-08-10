import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiNetworkRouterDhcpModal {
    @bindable name = "";
    @bindable onapprove = ''; // 确认回调函数
    @bindable ondeny = ''; // 取消回调函数

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.modal).find('.ui.dropdown').dropdown();
        $(this.modal).find('.checkbox').checkbox();
        $(this.modal).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
                this.name = '';
                $(this.form).form("reset");
            },
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

        $(this.modal).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.modal).modal('hide');
    }
}
