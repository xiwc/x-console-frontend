import {
    bindable
}
from 'aurelia-framework';

export class UiSecurityNewRuleModal {

    way = '1';

    causeIp = ""; //目标ip

    endPort = ""; //结束端口

    startPort = ""; //起始端口

    userName = ""; //用户名

    softName = ""; //名称

    constructor() { // 通过构造函数注入
    }

    attached() {

        $(this.uiBehaviorRef).checkbox();

        $(this.uiResetSshkey).checkbox({
            onChecked: () => {
                this.way = '1';
            }
        });
        $(this.uiResetPassword).checkbox({
            onChecked: () => {
                this.way = '2';
            }
        });

        $(this.md).modal({
            closable: false,
            onShow: () => {
                this.causeIp = "";
                this.endPort = "";
                this.startPort = "";
                this.userName = "";
                this.softName = "";
                $(this.form).form('reset');
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }
                this.onapprove && this.onapprove();
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });

        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                softName: {
                    identifier: 'softName',
                    rules: [{
                        type: 'empty',
                        prompt: '名称不能为空!'
                    }]
                },
                userName: {
                    identifier: 'userName',
                    rules: [{
                        type: 'empty',
                        prompt: '用户名不能为空!'
                    }]
                },
                startPort: {
                    identifier: 'startPort',
                    rules: [{
                        type: 'empty',
                        prompt: '起始端口不能为空!'
                    }]
                },
                endPort: {
                    identifier: 'endPort',
                    rules: [{
                        type: 'empty',
                        prompt: '结束端口不能为空!'
                    }]
                },
                causeIp: {
                    identifier: 'causeIp',
                    rules: [{
                        type: 'empty',
                        prompt: '目标ip不能为空!'
                    }]
                },
            }
        });

        $(this.uiEncrypt).dropdown();
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
