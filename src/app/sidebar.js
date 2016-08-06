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
        $(this.uiRegion).dropdown();

        var historyTimer = null;
        $('.nx-labeled-icon-item', this.uiSidebar).hover((evt) => {
            $(this.uiPpMenuContainer).empty().append($(evt.target).find('.nx-second-menu .ui.menu').clone());
            historyTimer && clearTimeout(historyTimer);
            $(this.uiPpMenuContainer).css({
                top: $(evt.target).offset().top
            }).show();
        }, () => {
            historyTimer = setTimeout(() => {
                $(this.uiPpMenuContainer).hide();
            }, 200);
        });

        $(this.uiPpMenuContainer).hover(() => {
            historyTimer && clearTimeout(historyTimer);
        }, () => {
            $(this.uiPpMenuContainer).hide();
        });

        $('body').on('click', '.nx-popup-menu-container .ui.menu .item', (event) => {
            $(this.uiPpMenuContainer).hide();
        });
    }
}
