import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerSSH {

    steps = ['上海一区', '云服务器', 'SSH秘钥'];

    sshkeys;

    allChecked = false;

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
                _.each(this.sshkeys, (k) => { k.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.sshkeys, (k) => { k.checked = false });
                this.allChecked = false;
            },
        });
    }

    /**
     * 在视图模型(ViewModel)展示前执行一些自定义代码逻辑
     * @param  {[object]} params                参数
     * @param  {[object]} routeConfig           路由配置
     * @param  {[object]} navigationInstruction 导航指令
     * @return {[promise]}                      你可以可选的返回一个延迟许诺(promise), 告诉路由等待执行bind和attach视图(view), 直到你完成你的处理工作.
     */
    activate(params, routeConfig, navigationInstruction) {
        this.getSshkeys();
    }

    getSshkeys() { // TODO mockserver?
        this.sshkeys = [{
            id: 'ssh-kajksdjns',
            name: '密钥001',
            method: 'ssh-rsa',
            createDate: '2天前'
        }, {
            id: 'ssh-kajksdjns',
            name: '密钥001',
            method: 'ssh-rsa',
            createDate: '2天前'
        }];
    }

    getCheckedItems() {
        return _.filter(this.sshkeys, (k) => {
            return k.checked;
        });
    }

    isAllChecked() {
        let flg = true;
        _.each(this.sshkeys, (k) => {
            if (!k.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
    }

    selectHandler(uiChk, sshkey) {
        $(uiChk).checkbox({
            onChecked: () => {
                sshkey.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                sshkey.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    refreshHandler() {
        // toastr.info('刷新操作...');
        this.getSshkeys();
        toastr.info('刷新完成!');
    }

    createHandler() {
        // toastr.info('创建操作...');
        this.uiSshkeyCreateModal.show();
    }

    delHandler() {
        this.confirm.show({
            content: '确定要删除选择的SSH密钥吗?',
            onapprove: (result) => { console.log(result) }
        });
    }

    updateHandler() {
        // toastr.info('修改名称操作...');
        this.uiNameUpdateModal.show((result) => { console.log(result) });
    }
}
