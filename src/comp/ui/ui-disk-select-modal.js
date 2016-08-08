import {
    bindable,
    containerless
}
from 'aurelia-framework';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiDiskSelectModal {

    @bindable type = 'mount'; // mount or unmount

    @bindable hostdetail = null; // 主机信息

    disks = null;

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
                if (this.type == 'mount') {
                    this.getUnBindDiskList();
                } else {
                    this.getBindDiskList();
                }
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

        return _.find(this.disks, (item) => {
            return item.selected;
        });
    }

    clearChecked() {
        _.each(this.disks, (item) => {
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
     * 获取未绑定云硬盘数据
     */
    getUnBindDiskList() {

        this.http.fetch(nsApi.url('host.disk.listUnbind', {
            "id": this.hostdetail && this.hostdetail.id,
            "pageNo": 1,
            "pageSize": 100
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.disks = data.list;
        });
    }

    /**
     * 获取已绑定云硬盘数据
     */
    getBindDiskList() {

        this.http.fetch(nsApi.url('host.disk.listBind', {
            "id": this.hostdetail && this.hostdetail.id,
            "pageNo": 1,
            "pageSize": 100
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.disks = data.list;
        });
    }
}
