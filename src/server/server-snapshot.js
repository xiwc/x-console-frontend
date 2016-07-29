export class ServerSnapshot {

    steps = ['上海一区', '云服务器', '快照'];

    page = {
        currentPage: 1,
        pageSize: 10,
        size: 10,
        total: 75,
        pageCount: 8,
        hasPreviousPage: false,
        hasNextPage: true
    };

    snapshots;

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

    recoverHandler() {

        this.uiSnapshotRecoverModal.show(() => {
            toastr.info('恢复...!');
        });
    }

    getSnapshots() {
        return this.snapshots = [
            { name: 'host01-snap', count: 5, resource: 'host01', capacity: 50, createPeriod: '两天前' },
            { name: 'host02-snap', count: 3, resource: 'host02', capacity: 50, createPeriod: '两天前' }
        ];
    }

    refreshHandler() {

        this.getSnapshots();
        toastr.info('刷新成功!');
    }

    selectHandler(uiChk, snapshot) {
        $(uiChk).checkbox({
            onChecked: () => {
                this.selectSnapshot = snapshot;
                // console.log(snapshot);
            }
        });
    }

    onpageHandler(selectedPage) {
        console.log(selectedPage);
        this.page = {
            currentPage: selectedPage,
            pageSize: 10,
            size: 10,
            total: 75,
            pageCount: 8,
            hasPreviousPage: false,
            hasNextPage: true
        };
    }
}
