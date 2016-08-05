import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ServerDisk {

    steps = ['上海一区', '云服务器', '硬盘'];

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
                _.each(this.disks, (d) => { d.checked = true });
                this.allChecked = true;
            },
            onUnchecked: () => {
                _.each(this.disks, (d) => { d.checked = false });
                this.allChecked = false;
            },
        });

        $('table.sortable').tablesort();
    }

    selectHandler(uiChk, disk) {
        $(uiChk).checkbox({
            onChecked: () => {
                disk.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                disk.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    isAllChecked() {
        let flg = true;
        _.each(this.disks, (d) => {
            if (!d.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
    }

    getCheckedItems() {
        return _.filter(this.disks, 'checked');
    }

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

    getDisks(pageNo = 1) {
        return this.http.fetch(nsApi.url('disk.list.get', {
            pageNo: pageNo,
            pageSize: nsConfig.pageSize
        })).then((resp) => {
            return resp.json();
        }).then((data) => {
            this.disks = data.list;
            this.page = data;
            this.pageNo = pageNo;
        }).then(() => {
            this.allChecked = false;
        });
    }

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    refreshHandler() {
        this.getDisks(this.pageNo);
        toastr.info('刷新成功!');
    }

    createHandler() {
        // toastr.info('创建操作...');
        this.uiDiskCreateModal.show(() => { this.getDisks(); });
    }

    delInBatchHandler() {

        let items = this.getCheckedItems();
        if (items.length == 0) {
            toastr.error('请先选择要删除的硬盘!');
            return;
        }

        this.confirm.show({
            content: '确定要删除选择的硬盘吗?',
            onapprove: () => {
                let items = this.getCheckedItems();
                if (items.length == 0) {
                    toastr.error('请先选择要删除的硬盘!');
                    return;
                }

                this.http.fetch(nsApi.url('disk.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: _.map(items, "id")
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.disks = _.filter(this.disks, (d) => {
                            return (d.id != disk.id);
                        });
                        toastr.success('删除成功!');
                    }

                });
            }
        });
    }

    delHandler(disk) {

        this.confirm.show({
            content: `确定要删除硬盘[${disk.name}]吗?`,
            onapprove: () => {
                this.http.fetch(nsApi.url('disk.delete.post'), {
                    method: 'post',
                    body: json({
                        ids: [disk.id]
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.disks = _.filter(this.disks, (d) => {
                            return (d.id != disk.id);
                        });
                        toastr.success('删除成功!');
                    }
                });
            }
        });
    }

    updateHandler(disk) {
        this.selectedDisk = disk;
        // console.log(disk);
        // toastr.info('修改名称操作...');
        this.uiNameUpdateModal.show((result => {
            // console.log(result);
            this.http.fetch(nsApi.url('disk.updateName.post'), {
                method: 'post',
                body: json({
                    id: disk.id,
                    name: result.name,
                    desc: result.desc
                })
            }).then((resp) => {
                // this. = resp.data;
                disk.name = result.name;
                disk.desc = result.desc;
                toastr.success('修改名称操作成功!');
            });
        }));

    }

    //加载到主机
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

    //扩容操作
    extendSizeHandler(o) {
        // toastr.info('扩容操作...');
        this.selectedDisk = o;
        this.uiDiskExpansionModal.show({
            sth: { maxCapacity: 1000 - o.capacity },
            onapprove: (result) => {
                console.log(result);
                this.http.fetch(nsApi.url('disk.expand.post'), {
                    method: 'post',
                    body: json({
                        id: o.id,
                        capacity: result.capacity
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        o.capacity += Number(result.capacity);
                        toastr.success('扩容成功!');
                    }
                });
            }
        });
    }

    onpageHandler(selectedPage) {
        this.getDisks(selectedPage);
    }
}
