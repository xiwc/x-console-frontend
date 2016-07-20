import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class Sidebar {

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.nx-pp').popup({
            onShow: () => {
                return $('.nx-body').hasClass('nx-left-sidebar-menu-labeled-icon');
            }
        });
    }
}
