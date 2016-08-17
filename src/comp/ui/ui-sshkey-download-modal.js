import {
    bindable
}
from 'aurelia-framework';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class UiSshkeyDownloadModal {

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    attached() {

        $(this.md).modal({
            closable: false,
            onApprove: () => {
                window.location = nsApi.url('keystore.download.get', {
                    id: this.id
                });
            },
            onDeny: () => {}
        });
    }

    /**
     * 显示确认窗口
     * @param onapprove: 确认回调函数
     * @param ondeny: 取消回调函数
     */
    show(config) {

        this.id = config.id;
        this.name = config.name;

        $(this.md).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.md).modal('hide');
    }

}
