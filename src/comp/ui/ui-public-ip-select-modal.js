import {
    bindable,
    containerless
}
from 'aurelia-framework';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))

@containerless
export class UiPublicIpSelectModal {

    @bindable type = 'bind'; // bind or unbind

    @bindable hostdetail = null; //主机信息

    publicIps = null;

    page = { currentPage: 1 };

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
                this.getPubilcIpList();
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

        return _.find(this.publicIps, (item) => {
            return item.selected;
        });
    }

    clearChecked() {
        _.each(this.publicIps, (item) => {
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
     * 获取公网ip下拉列表
     */
    getPubilcIpList() {
        this.http.fetch(nsApi.url('host.publicIp.listName.get', {
            "pageNo": this.page.currentPage,
            "pageSize": nsConfig.modalPageSize
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.publicIps = data.list;
            this.page = data;
        });
    }

    //切换了分页
    onpageHandler(selectedPage) {
        this.page.currentPage = selectedPage;
        this.getUnBindNetworkList();
    }
}
