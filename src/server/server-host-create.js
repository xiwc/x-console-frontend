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

    authType = '1'; // '1' : password | '2' : 'ssh key'

    // 总体选择配置信息
    totalConfig = {
        zone: '',
        hostType: '',
        cpuType: '',
        netType: '',
        bwType: '',
        bwSize: '',
        auth: '',
        pwd: '',
        duration: '',
        count: '1'
    };

    sshKeys = [
        { label: 'ssh-key01', value: '1' },
        { label: 'ssh-key02', value: '2' },
        { label: 'ssh-key03', value: '3' }
    ];

    zones = [
        { label: '上海1区', value: '1' },
        { label: '上海2区', value: '2' },
        { label: '上海3区', value: '3' }
    ];

    mirrors = [
        { label: 'CentOS', value: '1' },
        { label: 'Windows Server2008', value: '2' },
        { label: 'Ubuntu', value: '3' }
    ];

    versions = [
        { label: 'CentOS5.0', value: '1' },
        { label: 'CentOS6.0', value: '2' },
        { label: 'CentOS7.0', value: '3' }
    ];

    durations = [
        { label: '1个月', value: '1' },
        { label: '2个月', value: '2' },
        { label: '3个月', value: '3' },
        { label: '4个月', value: '4' },
        { label: '5个月', value: '5' },
        { label: '6个月', value: '6' },
        { label: '7个月', value: '7' },
        { label: '8个月', value: '8' },
        { label: '9个月', value: '9' },
        { label: '10个月', value: '10' },
        { label: '11个月', value: '11' },
        { label: '12个月', value: '12' }
    ];

    hostTypes = [{
        label: '经济适用型',
        value: '1',
        selected: true
    }, {
        label: '性能型',
        value: '2',
        selected: false
    }];

    cpuTypes = [{
        label: '1核',
        value: '1',
        selected: true
    }, {
        label: '2核',
        value: '2',
        selected: false
    }, {
        label: '4核',
        value: '4',
        selected: false
    }, {
        label: '8核',
        value: '8',
        selected: false
    }, {
        label: '16核',
        value: '16',
        selected: false
    }];

    memTypes = [{
        label: '1GB',
        value: '1',
        selected: true
    }, {
        label: '2GB',
        value: '2',
        selected: false
    }, {
        label: '4GB',
        value: '4',
        selected: false
    }, {
        label: '8GB',
        value: '8',
        selected: false
    }, {
        label: '16GB',
        value: '16',
        selected: false
    }, {
        label: '32GB',
        value: '32',
        selected: false
    }, {
        label: '64GB',
        value: '64',
        selected: false
    }];

    netTypes = [{
        label: '经典网络',
        value: '1',
        selected: true
    }, {
        label: '私有网络',
        value: '2',
        selected: false
    }];

    // 公网带宽
    bwTypes = [{
        label: '按固定带宽',
        value: '1',
        selected: true
    }, {
        label: '按使用流量',
        value: '2',
        selected: false
    }];

    // 镜像类型
    mirrorTypes = [{
        label: '系统镜像',
        value: '1',
        selected: true
    }, {
        label: '自有镜像',
        value: '2',
        selected: false
    }, {
        label: '共享镜像',
        value: '3',
        selected: false
    }, {
        label: '市场镜像',
        value: '4',
        selected: false
    }];

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        this.steps = $(this.stepsContainer).find('.steps .step');
        this.tabs = $(this.stepsContainer).find('.tab');
        this.stepCnt = this.steps.size();

        $(this.rangeBw).ionRangeSlider({
            onChange: () => {
                // console.log($(this.rangeBw).val());
                this.getTotalConfig();
            }
        });

        $('.ui.dropdown', this.stepsContainer).dropdown({
            onChange: () => {
                this.getTotalConfig();
            }
        });

        $(this.uiPwd).checkbox({
            onChecked: () => {
                this.authType = '1';
            }
        });
        $(this.uiSshKey).checkbox({
            onChecked: () => {
                this.authType = '2';
            }
        });
    }

    getSelectedItem(items) {
        return _.first(_.filter(items, (item) => {
            return item.selected;
        }));
    }

    getDropDownSelectedItem(uiDd, models) {
        let val = $(uiDd).dropdown('get value');
        let selected = null;
        _.each(models, (item) => {
            if (item.value == val) {
                selected = item;
                return false;
            }
        });

        return selected;
    }

    /**
     * 获取总体配置
     * @return {[type]} [description]
     */
    getTotalConfig() {

        return this.totalConfig = _.extend(this.totalConfig, {
            zone: this.getDropDownSelectedItem(this.uiZones, this.zones),
            mirror: this.getDropDownSelectedItem(this.uiMirrors, this.mirrors),
            version: this.getDropDownSelectedItem(this.uiVersions, this.versions),
            duration: this.getDropDownSelectedItem(this.uiDuration, this.durations),
            hostType: this.getSelectedItem(this.hostTypes),
            cpuType: this.getSelectedItem(this.cpuTypes),
            memType: this.getSelectedItem(this.memTypes),
            netType: this.getSelectedItem(this.netTypes),
            bwType: this.getSelectedItem(this.bwTypes),
            mirrorType: this.getSelectedItem(this.mirrorTypes),
            bwSize: $(this.rangeBw).val(),
            auth: '',
            pwd: '',
        })
    }

    show() {
        $(this.modal).modal({
            onShow: () => {
                this.reset();
                this.getTotalConfig();
            },
            onApprove: () => {

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
        if (step > 1) {
            $step.removeClass('active');
            $step.prev().removeClass('disabled').addClass('active');
            $tab.removeClass('active');
            $tab.prev().addClass('active');
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
        if (step < this.stepCnt) {
            $step.removeClass('active');
            $step.next().removeClass('disabled').addClass('active');
            $tab.removeClass('active');
            $tab.next().addClass('active');
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
        console.log(this.getTotalConfig());
        // toastr.info(JSON.stringify(this.getTotalConfig()));
        $(this.modal).modal('hide');
    }

    btnGrpSelectHandler() {
        this.getTotalConfig();
    }

}
