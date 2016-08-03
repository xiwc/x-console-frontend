import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiNetworkPublicipCreateModal {

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    name = "";
    count = 1;
    bankWidth = 1;

    constructor(getHttp) { // 通过构造函数注入
        this.http = getHttp();
    }

    attached() {
        this.bankWidth = 1;
        $(this.rangeSize).ionRangeSlider({
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            onChange: () => {
                this.bankWidth = $(this.rangeSize).val();
                // console.log($(this.rangeBw).val());
            }
        });

        this.slider = $(this.rangeSize).data("ionRangeSlider");

        $(this.md).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
                this.name = '';
                this.count = 1;
                $(this.form).form("reset");
                this.slider.reset();
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }
                this.http.fetch(nsApi.url('publicIp.create.post'), {
                    method: 'post',
                    body: json({
                        "name": this.name,
                        "count": this.count,
                        "bandwidth": $(this.rangeSize).val(),
                        "chargemode": $(this.chargemode).val(),
                        "ipline": $(this.linemode).val()
                    })
                }).then((resp) => {
                    // this. = resp.data;
                    if (resp.ok) {
                        this.onapprove && this.onapprove();
                        toastr.success('申请成功!');
                    }
                });
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
                        type: 'regExp[/^[a-zA-Z0-9\-_]{1,16}$/]',
                        prompt: '1-16个字符(大写字母,小写字母,数字,-,_)!'
                    }]
                },
                count: {
                    identifier: 'count',
                    rules: [{
                        type: 'empty',
                        prompt: '数量不能为空!'
                    }, {
                        type: 'integer[1..10]',
                        prompt: '数量必须是介于1到5的整数!'
                    }]
                },
                bankWidth:{
                    identifier: 'bankWidth',
                    rules: [{
                        type: 'empty',
                        prompt: '数量不能为空!'
                    }, {
                        type: 'integer[1..10]',
                        prompt: '带宽上限必须是介于1到5的整数!'
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

    /* 隐藏确认窗口 */
    hide() {
        $(this.md).modal('hide');
    }

}
