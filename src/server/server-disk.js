import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerDisk {

    steps = ['上海一区', '云服务器', '硬盘'];

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {}

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.getDisks();
    }

    getDisks() {
        return this.http.fetch(nsApi.url('disk.list.get', { pageNo: 1, pageSize: 1 })).then((resp) => {
            this.disks = resp.data;
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    refreshHandler() {
        this.getDisks();
        toastr.info('刷新成功!');
    }

    createHandler() {
        // toastr.info('创建操作...');
        this.uiDiskCreateModal.show();
    }

    delHandler() {
        this.confirm.show({
            content: '确定要删除硬盘xxxxx吗?<br/>资源删除后会在回收站中保留2小时'
        });
    }

    updateHandler() {
        // toastr.info('修改名称操作...');
        this.uiNameUpdateModal.show((result => {
            console.log(result);
        }));
    }

    addToHostHandler() {
        // toastr.info('加载到主机操作...');
        this.uiHostSelectModal.show((result => {
            console.log(result);
        }));
    }

    removeFromHostHandler() {
        // toastr.info('从主机卸载操作...');
        this.confirm.show({
            onapprove: () => {},
            warning: true,
            content: '物理卸载硬盘之前,请确保该硬盘在主机的操作系统中处于非加载状态(unmounted). 确定要卸载硬盘xxxxx?'
        });
    }

    extendSizeHandler() {
        // toastr.info('扩容操作...');
        this.uiDiskExpansionModal.show();
    }
}
