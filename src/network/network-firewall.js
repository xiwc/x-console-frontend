import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class NetworkFirewall {
    steps = [
        { name: '上海一区', href: '#' },
        { name: '专用VPC网络', href: '/#/network/private' },
        { name: '防火墙' }
    ];

    allChecked = false;
    fireWalls = null;
    page = {
        currentPage: 1,
        pageSize: nsConfig.pageSize
    };

    initActionsHandler(uiActions) {
        $(uiActions).dropdown({
            action: 'hide'
        });
    }

    selectHandler(uiChk, pn) {
        $(uiChk).checkbox({
            onChecked: () => {
                pn.checked = true;
                this.allChecked = this.isAllChecked();
            },
            onUnchecked: () => {
                pn.checked = false;
                this.allChecked = this.isAllChecked();
            }
        });
    }

    isAllChecked() {
        let flg = true;
        _.each(this.privateNetworks, (d) => {
            if (!d.checked) {
                flg = false;
                return false;
            }
        });

        return flg;
    }

    getCheckedItems() {
        return _.filter(this.privateNetworks, (d) => {
            return d.checked;
        });
    }

    //修改名称
    updateName(pn) {
        this.selectedPrivateNetwork = pn;
        this.updateconfirm.show((result => {
            // this.http.fetch(nsApi.url('privateNetwork.updateName.post'), {
            //     method: 'post',
            //     body: json({
            //         id: pn.id,
            //         name: result.name,
            //         desc: result.desc
            //     })
            // }).then((resp) => {
            //     pn.name = result.name;
            //     pn.desc = result.desc;
            //     toastr.success('修改名称操作成功!');
            // });
        }));
    }

    //批量删除
    delMoreHandler() {
        //获取被选中的记录
        var items = this.getCheckedItems();
        if (items.length == 0) {
            toastr.error('请先选择要删除的项目!');
            return;
        }
        this.deleteconfirm.show({
            title: "删除提示",
            onapprove: () => {
                let idlist = [];
                _.each(items, (i) => {
                    idlist.push(i.id);
                });
                // this.http.fetch(nsApi.url('privateNetwork.delete.post'), {
                //     method: 'post',
                //     body: json({
                //         ids: idlist
                //     })
                // }).then((resp) => {
                //     if (resp.ok) {
                //         this.getPrivateNetwork();
                //         toastr.success('删除成功!');
                //     }
                // });
            }
        });
    }

    //删除单条
    delHandler(pn) {
        pn = { name: "防火墙1" };
        this.deleteconfirm.show({
            title: "删除提示",
            content: '确定要删除私有网络<code>' + pn.name + '</code>吗?',
            onapprove: () => {
                // this.http.fetch(nsApi.url('privateNetwork.delete.post'), {
                //     method: 'post',
                //     body: json({
                //         ids: [pn.id]
                //     })
                // }).then((resp) => {
                //     // this. = resp.data;
                //     if (resp.ok) {
                //         this.getPrivateNetwork();
                //         toastr.success('删除成功!');
                //     }
                // });
            }
        });
    }

}
