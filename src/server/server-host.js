export class ServerHost {

    steps = ['上海一区', '云服务器', '主机'];

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

}
