import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerHost {

    steps = ['上海一区', '云服务器', '主机'];

    allChecked = false;

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
        $(this.uiChkAll).checkbox({
            onChecked: () => {
                _.each(this.hosts, (item) => { item.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.hosts, (item) => { item.checked = false });
                this.allChecked = false;
            },
        });

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
        this.getHosts();
    }

    getHosts(pageNo = 1) {
        return this.http.fetch(nsApi.url('host.list.get', {
            pageNo: pageNo,
            pageSize: nsConfig.pageSize
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.hosts = data.list;
            this.page = data;
        });
    }

    isAllChecked() {

        return _.every(this.hosts, (item) => {
            return item.checked;
        });
    }

    selectHandler(uiChk, item) {
        $(uiChk).checkbox({
            onChecked: () => {
                item.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                item.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    delHandler() {
        this.confirm.show();
    }

    createHandler() {
        this.uiHostCreateModal.show();
    }

    refreshHandler() {

        this.getHosts();
        this.allChecked = false;
        toastr.success('刷新成功!');
    }

    onpageHandler(selectedPage) {
        // console.log(selectedPage);
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

    getCheckedItems() {
        return _.filter(this.hosts, 'checked');
    }

    existsChecked() {
        let checkedHosts = this.getCheckedItems();
        if (checkedHosts.length == 0) {
            toastr.error('请先选择要操作的主机!');
            return false;
        }
        return true;
    }

    startInBatchHandler() {

        this.existsChecked() && this.confirm.show({
            content: '确定要启动选择的主机吗?',
            onapprove: () => {
                _.each(this.getCheckedItems(), (item) => {
                    toastr.info('TODO...');
                });
            }
        });
    }

    softRebootInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要软重启选择的主机吗?',
            onapprove: () => {
                _.each(this.getCheckedItems(), (item) => {
                    toastr.info('TODO...');
                });
            }
        });
    }

    hardRebootInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要硬重启选择的主机吗?',
            onapprove: () => {
                _.each(this.getCheckedItems(), (item) => {
                    toastr.info('TODO...');
                });
            }
        });
    }

    shutdownInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要关机选择的主机吗?',
            onapprove: () => {
                _.each(this.getCheckedItems(), (item) => {
                    toastr.info('TODO...');
                });
            }
        });
    }

    delInBatchHandler() {
        this.existsChecked() && this.confirm.show({
            content: '确定要删除选择的主机吗?',
            onapprove: () => {
                _.each(this.getCheckedItems(), (item) => {
                    toastr.info('TODO...');
                });
            }
        });
    }

    updateNameHandler(item) {
        this.selectedHost = item;
        this.uiNameUpdateModal.show((result) => {
            toastr.info('TODO...');
        });
    }

    mountDiskHandler(item) {
        this.uiDiskSelectModal.show(() => {
            toastr.info('TODO...');
        });
    }

    unmountDiskHandler(item) {
        this.uiDiskSelectModalUnmount.show(() => {
            toastr.info('TODO...');
        });
    }

    mountSecurityHandler(item) {
        this.uiSecuritySelectModal.show(() => {
            toastr.info('TODO...');
        });
    }

    unmountSecurityHandler(item) {
        this.uiSecuritySelectModalUnmount.show(() => {
            toastr.info('TODO...');
        });
    }

    bindPublicIpHandler(item) {
        this.uiPublicIpSelectModal.show(() => {
            toastr.info('TODO...');
        });
    }

    unbindPublicIpHandler(item) {
        this.uiPublicIpSelectModalUnbind.show(() => {
            toastr.info('TODO...');
        });
    }

    inPrivateNetworkHandler(item) {
        this.uiNetworkPrivateSelectModal.show(() => {
            toastr.info('TODO...');
        });
    }

    outPrivateNetworkHandler(item) {
        this.uiNetworkPrivateSelectModalOut.show(() => {
            toastr.info('TODO...');
        });
    }

    createSnapshotHandler(item) {
        this.selectedHost = item;
        this.uiSnapshotCreateModal.show(() => {
            toastr.info('TODO...');
        });
    }

    resetHandler(item) {
        this.confirm.show({
            content: '重置主机系统会将您的操作系统盘重置为初始状态,确定要执行此操作吗?',
            onapprove: () => {
                toastr.success('TODO...');
            }
        });
    }

    delHandler(item) {
        this.confirm.show({
            content: '确定要删除主机[xxx]吗?',
            onapprove: () => {
                toastr.success('TODO...');
            }
        });
    }

}
