import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerMirror {

    steps = ['上海一区', '云服务器', '镜像'];

    // 选择的Mirror
    selectMirror;

    mirrors;

    page;


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

        $(this.chkAll).checkbox({
            onChecked: () => {
                _.each(this.mirrors, (m) => {
                    m.checked = true;
                });
            },
            onUnchecked: () => {
                _.each(this.mirrors, (m) => {
                    m.checked = false;
                });
            }
        });

        $('table.sortable').tablesort();
    }

    refreshHandler() {
        this.getMirrors().then(() => {
            toastr.info('刷新成功!');
        });
    }

    createHandler() {

        if (!this.selectMirror) {
            toastr.error('请先选择一个镜像!');
            return;
        }

        this.uiHostCreateModal.show();
        // toastr.info('创建操作...');
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {

        this.getMirrors();
    }

    getMirrors(pageNo = 1) {

        return this.http.fetch(nsApi.url('image.list.get', {
            type: '1',
            pageSize: nsConfig.pageSize,
            pageNo: pageNo
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.mirrors = data.list;
            this.page = data;
        });
    }

    selectHandler(uiChk, mirror) {
        $(uiChk).checkbox({
            onChecked: () => {
                this.selectMirror = mirror;
            }
        });
    }

    onpageHandler(selectedPage) {
        this.getMirrors(selectedPage);
    }

}
