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
        toastr.info('扩容操作...');
    }
}
