import { bindable, containerless } from 'aurelia-framework';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))

@containerless
export class UiHostSelectModal {

    hosts = null;

    page = {
        currentPage: 1,
        pageSize: 10
    };

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
                this.page.currentPage = 1;
                this.getHostList();
            },
            onApprove: () => {
                this.onapprove && this.onapprove({id:this.getSelected().id});
            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });
    }

    getHostList() {
        return this.http.fetch(nsApi.url('disk.host.listUnbind.get', { pageNo: this.page.currentPage, pageSize: this.page.pageSize, id: this.diskid }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.hosts = data.list;
                this.page = data;
            });
    }

    getSelected() {

        let selected = null;
        _.each(this.hosts, (host) => {
            if (host.selected) {
                selected = host;
            }
        });

        return selected;
    }

    clearChecked() {
        _.each(this.hosts, (host) => {
            host.selected = false;
        });
    }

    initChkHandler(uiSelect, host, first) {
        $(uiSelect).checkbox({
            onChecked: () => {
                this.clearChecked();
                host.selected = true;
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
    show(opt) {
        if (opt.sth) {
            for (let key in opt.sth)
                this[key] = opt.sth[key];
        }

        if (opt.onapprove) {
            this.onapprove = opt.onapprove;
        }

        if (opt.ondeny) {
            this.ondeny = opt.ondeny;
        }

        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }

    //切换了分页
    onpageHandler(selectedPage) {
        this.page.currentPage = selectedPage;
        this.getHostList();
    }
}
