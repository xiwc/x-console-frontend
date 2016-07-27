import {
    bindable,
    containerless
}
from 'aurelia-framework';

import 'ion-rangeslider';

@containerless
export class UiDiskExpansionModal {

    @bindable disk = {
        id: 'id',
        name: 'name',
    };

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {

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
                this.slider.reset();
            },
            onApprove: () => {},
            onDeny: () => {}
        });

    }

    show() {
        $(this.md).modal('show');
    }

    hide() {
        $(this.md).modal('hide');
    }
}
