import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class UiSshkeyCreateModal {

    way = '1';

    name = '';

    publicKey = '';

    @bindable onapprove; // 确认回调函数

    @bindable ondeny; // 取消回调函数

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

        $(this.uiCreateSshkey).checkbox({
            onChecked: () => {
                this.way = '1';
            }
        });
        $(this.uiExistSshkey).checkbox({
            onChecked: () => {
                this.way = '2';
            }
        });

        $(this.uiEncrypt).dropdown();

        $(this.md).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
            	this.name = '';
            	this.publicKey = '';
            	this.way = '1';
            	$(this.uiCreateSshkey).checkbox('set checked');
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }

                this.onapprove && this.onapprove({
                    way: this.way,
                    name: this.name,
                    encrypt: $(this.uiEncrypt).dropdown('get value'),
                    publicKey: this.publicKey
                });
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });

        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: '密钥名称不能为空!'
                    }]
                }
            }
        });
    }

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
