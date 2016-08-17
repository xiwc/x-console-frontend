import {
    bindable,
    containerless
}
from 'aurelia-framework';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiSshkeyCreateModal {

    way = '1';

    name = '';

    publicKey = '';

    @bindable onapprove; // 确认回调函数

    @bindable ondeny; // 取消回调函数

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

        $(this.uiCreateSshkey).checkbox({
            onChecked: () => {
                this.way = '1';
                this.formValidateNew();
            }
        });
        $(this.uiExistSshkey).checkbox({
            onChecked: () => {
                this.way = '2';
                this.formValidateExists();
            }
        });

        $(this.uiEncrypt).dropdown();

        $(this.md).modal({
            closable: false,
            autofocus: false,
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

                let body = {
                    "name": this.name,
                    "type": this.way
                };

                if (this.way == 1) {
                    body.encryptMode = $(this.uiEncrypt).dropdown('get value');
                }

                if (this.way == 2) {
                    body.publicKey = this.publicKey;
                }

                this.http.fetch(nsApi.url('keystore.create.post'), {
                    method: 'post',
                    body: json(body)
                }).then((resp) => {
                    if (resp.ok) {
                        resp.json().then((data) => {
                            data.way = this.way;
                            data.name = this.name;
                            this.onapprove && this.onapprove(data);
                            toastr.success('SSH密钥创建完成!');
                        });
                    }
                });
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });

        this.formValidateNew();

    }

    formValidateNew() {
        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: '密钥名称不能为空!'
                    }, {
                        type: 'regExp[/^[\u4E00-\u9FA5a-zA-Z0-9\-_]{1,16}$/]',
                        prompt: '1-16个字符(大小字母、数字、_、-、汉字)!'
                    }]
                }
            }
        });
    }

    formValidateExists() {
        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: '密钥名称不能为空!'
                    }, {
                        type: 'regExp[/^[\u4E00-\u9FA5a-zA-Z0-9\-_]{1,16}$/]',
                        prompt: '1-16个字符(大小字母、数字、_、-、汉字)!'
                    }]
                },
                publicKey: {
                    identifier: 'publicKey',
                    rules: [{
                        type: 'empty',
                        prompt: '公钥不能为空!'
                    }, {
                        type: 'pubkey',
                        prompt: '公钥校验不合法!'
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
