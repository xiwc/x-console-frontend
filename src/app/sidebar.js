import {
    bindable,
    containerless,
    inject
}
from 'aurelia-framework';

@inject(Element)
@containerless
export class Sidebar {

    @bindable router = null;

    links = [
        { title: 'RDS', icon: 'database', href: '' },
        { title: 'Redis', icon: 'database', href: '' },
        { title: 'MongoDb', icon: 'database', href: '' },
    ];

    /**
     * 构造函数
     */
    constructor(elem) {
        this.domRoot = elem;
    }

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
