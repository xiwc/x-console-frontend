// import 'https://x.newtouchwork.com/jspm_packages/github/components/jquery@1.11.2/jquery.min.js';
// import 'https://x.newtouchwork.com/jspm_packages/github/wlzc/semantic-ui.src@1.0.2/semantic.min.js';

import 'jquery';
import 'semantic-ui';

export class Demo {

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        $('.ui.accordion').accordion();
        $('.ui.dropdown').dropdown();
        $('.ui.dropdown.nx-dd-action-hide').dropdown({
            action: 'hide'
        });
        $('.ui.dropdown.nx-dd-action-hide-on-hover').dropdown({
            action: 'hide',
            on: 'hover'
        });
        $('.ui.modal').modal();

        $('.nx-menu-toggle').click(function(event) {
            var $lsm = $('.nx-body .nx-left-sidebar-menu');
            $lsm.toggleClass('labeled icon');
            $('.nx-body').toggleClass('nx-left-sidebar-menu-labeled-icon');
        });

        $('.nx-top-fixed-menu .nx-menu-item-pp')
            .popup({
                inline: true,
                offset: 1,
                distanceAway: -9,
                hoverable: true,
                position: 'bottom right',
                delay: {
                    show: 300,
                    hide: 300
                }
            });
    }
}
