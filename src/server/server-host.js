import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerHost {

    steps = ['上海一区', '云服务器', '主机'];

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
        $('.nx-dd-action-hide', this.container).dropdown({
            action: 'hide'
        });
    }

    delHandler() {
        this.confirm.show();
    }

    createHandler() {
        this.serverHostCreate.show();
    }

    refreshHandler() {

        this.http.fetch(nsApi['host.hostList.get']).then((resp => {
            return resp.json();
        })).then((json) => {
            toastr.info(JSON.stringify(json));
        });

        this.http.fetch(nsApi['host.create.post'], {
            method: 'post',
            body: json({ name: 'value' })
        }).then((resp => {
            return resp.json();
        })).then((json) => {
            toastr.info(JSON.stringify(json));
        });
    }

}
