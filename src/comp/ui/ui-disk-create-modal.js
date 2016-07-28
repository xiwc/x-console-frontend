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

    type = '1';

    name = '';

    count = '1';

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
                // console.log($(this.rangeBw).val());
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
                $(this.uiPerformance).checkbox('set checked');
                this.slider.reset();
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
                    // this. = resp.data;
                    this.onapprove && this.onapprove();
                    toastr.success('硬盘创建成功!');
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
                    }]
                },
                count: {
                    identifier: 'count',
                    rules: [{
                        type: 'empty',
                        prompt: '数量不能为空!'
                    }, {
                        type: 'integer[1..10]',
                        prompt: '一次创建硬盘数量必须是介于1到5的整数!'
                    }]
                }
            }
        });
    }

    show(onapprove) {
        this.onapprove = onapprove;
        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}