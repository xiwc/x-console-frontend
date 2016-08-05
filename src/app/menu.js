import {
    bindable,
    containerless
}
from 'aurelia-framework';

@containerless
export class Menu {

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        nsCtx.topMenuHeight = $(this.uiMenu).height();
        $(this.uiAccount).dropdown({
            action: 'hide',
            on: 'hover'
        });

        // $('.nx-top-fixed-menu .nx-menu-item-pp')
        //     .popup({
        //         inline: true,
        //         offset: 1,
        //         distanceAway: -9,
        //         hoverable: true,
        //         position: 'bottom right',
        //         delay: {
        //             show: 300,
        //             hide: 300
        //         }
        //     });
    }

    sidebarToggleHandler() {
        var $lsm = $('.nx-body .nx-left-sidebar-menu');
        $lsm.toggleClass('labeled icon');
        $('.nx-body').toggleClass('nx-left-sidebar-menu-labeled-icon');
    }
}
