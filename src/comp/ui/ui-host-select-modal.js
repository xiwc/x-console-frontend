import {
    bindable,
    containerless
}
from 'aurelia-framework';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))

@containerless
export class UiHostSelectModal {

    hosts = [
        { id: 'host01', name: 'host01', type: '性能型' },
        { id: 'host02', name: 'host02', type: '性能型' },
        { id: 'host03', name: 'host03', type: '性能型' },
    ];

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
                this.http.fetch(nsApi.url('router.listName.get'))
                    .then((resp) => {
                        return resp.json();
                    }).then((data) => {
                        this.routerList = data;
                    });
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
