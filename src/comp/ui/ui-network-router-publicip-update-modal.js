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
export class UiNetworkRouterPublicipUpdateModal {

    @bindable pip = "";

    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    publicIpList = null;

    constructor(getHttp) { // 通过构造函数注入
        this.http = getHttp();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $(this.md).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
                $(this.form).form("reset");
                $(this.selectPublicIp).dropdown("clear");
                this.publicIpList = null;
                this.http.fetch(nsApi.url('router.publicIp.listName.post'), { method: 'post' })
                    .then((resp) => {
                        return resp.json();
                    }).then((data) => {
                        this.publicIpList = data;
                    });
            },
            onApprove: () => {
                this.onapprove && this.onapprove({
                    publicipid: $(this.selectPublicIp).dropdown("get value"),
                    ipname: $(this.selectPublicIp).dropdown("get text")
                });
            },
            onDeny: () => { this.ondeny && this.ondeny(); }
        });
    }

    initPublicIpHandler(last) {
        if (last) {
            //console.log(JSON.stringify(this.publicIpList));
            $(this.selectPublicIp).dropdown("set value", this.publicIpList[0].id);
            $(this.selectPublicIp).dropdown("set text", this.publicIpList[0].ip);
        }
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
