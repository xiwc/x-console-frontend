import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

@containerless
export class UiNetworkRouterUpdatetypeModal {
    @bindable onapprove = ''; // 确认回调函数

    @bindable ondeny = ''; // 取消回调函数

    type = 1;

    attached() {
        $(this.md).modal({
            closable: false,
            allowMultiple: true,
            onShow: () => {
                console.log(this.type);
                $(".nx-ui-network-router-updatetype-modal").find('input[name=routerType]').each((index,item) =>{
                    $(item).prop("checked", $(item).val() == this.type);
                });
                
            },
            onApprove: () => {
                this.onapprove && this.onapprove({ "type": $("input[name='routerType']:checked").val() });
            },
            onDeny: () => { this.ondeny && this.ondeny(); }
        });
    }

    /**
     * 显示确认窗口
     * @param onapprove: 确认回调函数
     * @param ondeny: 取消回调函数
     */
    show(opt) {
        if (opt.sth) {
            for (var key in opt.sth)
                if (this.hasOwnProperty(key))
                    this[key] = opt.sth[key];
        }

        if (opt.onapprove) {
            this.onapprove = opt.onapprove;
        }

        if (opt.ondeny) {
            this.ondeny = opt.
            ondeny;
        }

        $(this.md).modal('show');
    }

    /* 隐藏确认窗口 */
    hide() {
        $(this.md).modal('hide');
    }

}
