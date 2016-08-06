import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiDiskCreateModal {

    // http://220.248.17.34:7992/pages/viewpage.action?pageId=5538651
    // 性能型:1 容量型:2
    type = '1';

    name = '';

    // TODO 校验, 数量不能超过资源限额,所以需要检测当前已经创建的数量.
    count = '1';

    capacity = 10;

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

        $(this.uiPerformance).checkbox({
            onChecked: () => {
                this.type = '1';
            }
        });
        $(this.uiCapacity).checkbox({
            onChecked: () => {
                this.type = '2';
            }
        });

        $(this.rangeSize).ionRangeSlider({
            onChange: () => {
                this.capacity = $(this.rangeSize).val();
            }
        });

        this.slider = $(this.rangeSize).data("ionRangeSlider");

        $(this.md).modal({
            closable: false,
            // allowMultiple: true,
            onShow: () => {
                this.name = '';
                this.count = '1';
                this.type = '1';
                this.capacity = 10;
                $(this.uiPerformance).checkbox('set checked');
                this.slider.update({
                    from: 10
                });
            },
            onApprove: () => {
                if (!$(this.form).form('is valid')) {
                    toastr.error('表单验证不合法,请修改表单不合法输入!');
                    return false;
                }

                this.http.fetch(nsApi.url('disk.create.post'), {
                    method: 'post',
                    body: json({
                        "capacity": $(this.rangeSize).val(),
                        "count": this.count,
                        "name": this.name,
                        "regionId": nsCtx.regionId, // TODO 是否可以转移到 url中
                        "type": this.type // TODO 后端需要怎么mapping
                    })
                }).then((resp) => {
                    if (resp.ok) {
                        this.onapprove && this.onapprove();
                        toastr.success('硬盘创建成功!');
                    }
                });
            },
            onDeny: () => {}
        });

        $(this.form).form({
            on: 'blur',
            inline: true,
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: '硬盘名称不能为空!'
                    }, {
                        type: 'regExp[/^[\u4E00-\u9FA5a-zA-Z0-9\-_]{1,16}$/]',
                        prompt: '1-16个字符(大小字母、数字、_、-、汉字)!'
                    }]
                },
                count: {
                    identifier: 'count',
                    rules: [{
                        type: 'empty',
                        prompt: '数量不能为空!'
                    }, {
                        type: 'integer[1..50]',
                        prompt: '一次创建硬盘数量必须是介于1到50的整数!'
                    }]
                }
            }
        });
    }

    checkCapacity(uiCapacity) {
        let val = $(uiCapacity).val();
        if (isNaN(val)) {
            val = val.replace(/[^0-9]/g, '');
            val = (!val || val == 0) ? 10 : val;
            $(uiCapacity).val(val);
        } else {
            val = parseInt(val);
            if (val > 5000) {
                val = 5000;
                $(uiCapacity).val(val);
            } else if (val < 10) {
                val = 10;
                $(uiCapacity).val(val);
            } else {
                let v = val / 10;
                let v2 = parseInt(v);
                if (v != v2) {
                    val = v2 * 10;
                    $(uiCapacity).val(val);
                }
            }
        }

        this.slider.update({
            from: val
        });
    }

    keyupHandler(evt, uiCapacity) {

        if (evt.keyCode == 13) {
            this.checkCapacity(uiCapacity);
        }
    }

    focusoutHandler(evt, uiCapacity) {
        this.checkCapacity(uiCapacity);
    }

    show(onapprove) {
        this.onapprove = onapprove;
        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}
