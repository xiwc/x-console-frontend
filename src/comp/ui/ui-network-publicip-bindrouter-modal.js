import {
    bindable,
    containerless
}
from 'aurelia-framework';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiNetworkPublicipBindrouterModal {

    @bindable ipname = ''; 

    routerList = null;

    constructor(getHttp) { // 通过构造函数注入
        this.http = getHttp();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.md).modal({
            closable: false,
            onShow: () => {
                $(this.form).form("reset");
                this.http.fetch(nsApi.url('router.listName.get'))
                    .then((resp) => {
                        return resp.json();
                    }).then((data) => {
                        this.routerList = data;
                    });
            },
            onApprove: () => {
                let val = $(this.md).find("input[name=routerChecked]").val();
                if(!val){
                    toastr.error("请选择要绑定的路由器");
                    return false;
                }
                this.onapprove && this.onapprove({id:val});
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });
    }

    getSelected() {
        return _.find(this.privateNetworks, 'selected');
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
