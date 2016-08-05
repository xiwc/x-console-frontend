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
        { title: 'RDS', icon: 'calendar', href: '' },
        { title: 'Redis', icon: 'bar chart', href: '' },
        { title: 'MongoDb', icon: 'travel', href: '' },
        // { title: '端口映射', icon: 'exchange', href: '' },
        // { title: 'WEB域名映射', icon: 'exchange', href: '' },
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

        $('.nx-pp', this.uiSidebar).popup({
            onShow: () => {
                return $('.nx-body').hasClass('nx-left-sidebar-menu-labeled-icon');
            }
        });

        $(this.uiAccordion).accordion();
    }
}
