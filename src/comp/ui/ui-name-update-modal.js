import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiNameUpdateModal {

    name = '';

    desc = '';

    @bindable showDesc = true;

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

        $(this.md).modal({
            closable: false,
            autofocus: false,
            // allowMultiple: true,
            onShow: () => {
                this.name = '';
                this.desc = '';
                $(this.form).form('reset');
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }
                this.onapprove && this.onapprove({ name: this.name, desc: this.desc });
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

        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}
