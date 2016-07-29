import {
    bindable,
    containerless
}
from 'aurelia-framework';
/*
 * 操作确认窗口
 */
@containerless
export class UiNetworkRouterCreateModal {

    @bindable title = ''; // 窗口标题

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    name = "";

    constructor() { // 通过构造函数注入
    }

    attached() {
        $(this.md).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
                this.name = '';
                $(this.form).form("reset");
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }
                console.log(this.name)
                this.onapprove && this.onapprove({ name: this.name });
            },
            onDeny: () => { this.ondeny && this.ondeny(); }
        });

        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: '名称不能为空!'
                    }]
                }
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
