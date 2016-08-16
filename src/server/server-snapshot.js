import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerSnapshot {

    steps = ['上海一区', nsCtx.serverInfo, '快照'];

    page = {
        currentPage: 1
    };

    snapshots;

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
        $('table.sortable').tablesort();
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.getSnapshots();
    }

    getCheckedItem() {
        return _.find(this.snapshots, 'checked');
    }

    recoverHandler() {

        if (!this.getCheckedItem()) {
            toastr.error('请先选择需要恢复的快照链!');
            return;
        }

        this.uiSnapshotRecoverModal.show(() => {

        });
    }

    getSnapshots(pageNo = 1) {

        return this.http.fetch(nsApi.url('snapshot.list.get', {
            pageNo: pageNo,
            pageSize: nsConfig.pageSize
        })).then((resp) => {
            if (resp.ok) {
                return resp.json().then((data) => {
                    this.snapshots = data.list;
                    this.page = data;
                });
            }

            return resp;
        });
    }

    refreshHandler() {

        this.getSnapshots(this.page.currentPage).then(() => {
            toastr.info('刷新成功!');
        });
    }

    selectHandler(uiChk, snapshot) {
        $(uiChk).checkbox({
            onChecked: () => {
                this.selectSnapshot = snapshot;
                snapshot.checked = true;
            },
            onUnChecked: () => {
                snapshot.checked = false;
            }
        });
    }

    onpageHandler(selectedPage) {
        this.getSnapshots(selectedPage);
    }
}
