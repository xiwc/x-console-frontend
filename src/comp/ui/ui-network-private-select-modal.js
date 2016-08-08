import {
    bindable,
    containerless
}
from 'aurelia-framework';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiNetworkPrivateSelectModal {

    // @bindable type = 'in'; // in or out

    @bindable hostdetail = null; // 主机信息

    privateNetworks = null;

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
        $(this.md).modal({
            closable: false,
            onShow: () => {
                this.getUnBindNetworkList();
            },
            onApprove: () => {
                this.onapprove && this.onapprove(this.getSelected());
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });
    }

    getSelected() {

        return _.find(this.privateNetworks, (item) => {
            return item.selected;
        });
    }

    clearChecked() {
        _.each(this.privateNetworks, (item) => {
            item.selected = false;
        });
    }

    initChkHandler(uiSelect, item, first) {
        $(uiSelect).checkbox({
            onChecked: () => {
                this.clearChecked();
                item.selected = true;
            }
        });

        if (first) {
            $(uiSelect).checkbox('check');
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

    hide() {
        $(this.md).modal('hide');
    }

    /**
     * 获取未绑定私有网络列表
     */
    getUnBindNetworkList() {
        this.http.fetch(nsApi.url('host.privateNetwork.listUnbind', {
            "id": this.hostdetail && this.hostdetail.id,
            "pageNo": 1,
            "pageSize": 100
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.privateNetworks = data.list;
        });
    }
}
