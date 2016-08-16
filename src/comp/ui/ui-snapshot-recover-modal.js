import {
    bindable
}
from 'aurelia-framework';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class UiSnapshotRecoverModal {

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

                this.http.fetch(nsApi.url('snapshot.restore.post'), {
                    method: 'post',
                    body: json({
                        "id": "string" // TODO
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        toastr.success('快照恢复操作成功!');
                        this.onapprove && this.onapprove();
                    }
                });

            },
            onDeny: () => {
                this.ondeny && this.ondeny();
            }
        });

        $(this.md).on('click', '.tree li > a', (event) => {
            event.preventDefault();
            this.clearSelected();
            $(event.target).addClass('nx-selected');
        });
    }

    clearSelected() {
        $(this.md).find('.tree li > a.nx-selected').removeClass('nx-selected');
    }

    /**
     * 显示确认窗口
     * @param onapprove: 确认回调函数
     * @param ondeny: 取消回调函数
     */
    show(onapprove, ondeny) {

        this.onapprove = onapprove;
        this.ondeny = ondeny;

        $(this.md).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.md).modal('hide');
    }

}
