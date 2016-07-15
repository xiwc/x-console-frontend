import 'jquery';
import '../static/vender/semantic-ui/semantic';

export class App {

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
