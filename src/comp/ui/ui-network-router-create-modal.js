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
export class UiNetworkRouterCreateModal {

    @bindable title = ''; // 窗口标题

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    name = "";

    constructor(getHttp) { // 通过构造函数注入
        this.http = getHttp();
    }

    attached() {
        $(this.routermd).find('.ui.dropdown').dropdown();
        $(this.routermd).find('.checkbox').checkbox();
        $(this.routermd).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
                this.name = '';
                $(this.form).form("reset");
                //alert($(this.routermd).find("input[name='routertype']").length);
                $(this.routermd).find("input[name='routertype']").eq(0).prop("checked", true);
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }
                //console.log($("input[name='routertype']:checked").val());
                this.http.fetch(nsApi.url('router.create.post'), {
                    method: 'post',
                    body: json({
                        "name": this.name,
                        "securityGroupId": $(this.firewall).val(), // TODO 是否可以转移到 url中
                        "type": $("input[name='routertype']:checked").val() // TODO 后端需要怎么mapping
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.onapprove && this.onapprove();
                        toastr.success('创建成功!');
                    }
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

        $(this.routermd).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.routermd).modal('hide');
    }

}
