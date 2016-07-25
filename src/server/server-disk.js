export class ServerDisk {

    steps = ['上海一区', '云服务器', '硬盘'];

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.nx-dd-action-hide', this.container).dropdown({
            action: 'hide'
        });
    }

    refreshHandler() {
        toastr.info('刷新操作...');
    }

    createHandler() {
        toastr.info('创建操作...');
    }

    delHandler() {
        this.confirm.show();
    }

    updateHandler() {
        toastr.info('修改名称操作...');
    }

    addToHostHandler() {
        toastr.info('加载到主机操作...');
    }

    removeFromHostHandler() {
        toastr.info('从主机卸载操作...');
    }

    extendSizeHandler() {
        toastr.info('扩容操作...');
    }
}
