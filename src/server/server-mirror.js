export class ServerMirror {

    steps = ['上海一区', '云服务器', '镜像'];

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.nx-dd-action-hide', this.container).dropdown({
            action: 'hide'
        });
    }

    // 选择的Mirror
    selectMirror = {

    }

    refreshHandler() {
        toastr.info('刷新操作...');
    }

    createHandler() {
        toastr.info('创建操作...');
    }

}
