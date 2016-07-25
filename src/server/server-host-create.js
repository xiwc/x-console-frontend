import {
    bindable,
    containerless
}
from 'aurelia-framework';

// import 'ion-rangeslider/css/ion.rangeSlider.css';
// import 'ion-rangeslider/css/ion.rangeSlider.skinModern.css';
// import 'ion-rangeslider/css/ion.rangeSlider.skinFlat.css';
// import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
// import 'ion-rangeslider/css/ion.rangeSlider.skinNice.css';
// import 'ion-rangeslider/css/ion.rangeSlider.skinSimple.css';
import 'ion-rangeslider';

@containerless
export class ServerHostCreate {

    @bindable
    mirror;

    steps;

    tabs;

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        this.steps = $(this.stepsContainer).find('.steps .step');
        this.tabs = $(this.stepsContainer).find('.tab');
        this.stepCnt = this.steps.size();

        $(this.rangeBw).ionRangeSlider();

        $('.ui.dropdown', this.stepsContainer).dropdown();
    }

    show() {
        $(this.modal).modal({
            onShow: () => {
                this.reset();
            }
        }).modal('show');
    }

    reset() {
        $.each(this.steps, function(index, step) {
            if (index == 0) {
                $(step).addClass('active').removeClass('disabled');
            } else {
                $(step).removeClass('active').addClass('disabled');
            }
        });
        $.each(this.tabs, function(index, tab) {
            if (index == 0) {
                $(tab).addClass('active');
            } else {
                $(tab).removeClass('active');
            }
        });

        $(this.btnPre).addClass('disabled');
        $(this.btnOk).addClass('disabled');
        $(this.btnNext).removeClass('disabled');
    }

    preHandler() {
        let $step = $(this.steps).filter('.active.step');
        let $tab = $(this.tabs).filter('.active.tab');
        let step = this.steps.index($step) + 1;
        // let step = parseInt($step.attr('data-step'));
        if (step > 1) {
            $step.removeClass('active');
            $step.prev().removeClass('disabled').addClass('active');
            // $(this.steps).filter(`.step[data-step="${step - 1}"]`).removeClass('disabled').addClass('active');
            $tab.removeClass('active');
            $tab.prev().addClass('active');
            // $(this.tabs).filter(`.tab[data-step="${step - 1}"]`).addClass('active');
            $(this.btnOk).addClass('disabled');
            $(this.btnNext).removeClass('disabled');

            if (step == 2) {
                $(this.btnPre).addClass('disabled');
            }
        }
    }

    nextHandler() {
        let $step = $(this.steps).filter('.active.step');
        let $tab = $(this.tabs).filter('.active.tab');
        let step = this.steps.index($step) + 1;
        // let step = parseInt($step.attr('data-step'));
        if (step < this.stepCnt) {
            $step.removeClass('active');
            $step.next().removeClass('disabled').addClass('active');
            // $(this.steps).filter(`.step[data-step="${step + 1}"]`).removeClass('disabled').addClass('active');
            $tab.removeClass('active');
            $tab.next().addClass('active');
            // $(this.tabs).filter(`.tab[data-step="${step + 1}"]`).addClass('active');
            $(this.btnOk).addClass('disabled');
            $(this.btnPre).removeClass('disabled');

            if (step == this.stepCnt - 1) {
                $(this.btnOk).removeClass('disabled');
                $(this.btnNext).addClass('disabled');
            }
        }
    }

    cancelHandler() {
        $(this.modal).modal('hide');
    }

    okHandler() {
        $(this.modal).modal('hide');
    }

}
