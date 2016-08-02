import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiNameUpdateModal {

    @bindable name = '';

    @bindable desc = '';

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
                // this.name = '';
                // this.desc = '';
                // $(this.form).form('reset');
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
                    }, {
                        type: 'regExp[/^[\u4E00-\u9FA5a-zA-Z0-9\-_]{1,16}$/]',
                        prompt: '1-16个字符(大小字母、数字、_、-、汉字)!'
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
