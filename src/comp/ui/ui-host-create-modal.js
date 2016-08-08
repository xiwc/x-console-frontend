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
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class UiHostCreateModal {

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
        count: '1',
        hostName: ''
    };

    sshKeys = [
        { label: 'ssh-key01', value: '1' },
        { label: 'ssh-key02', value: '2' },
        { label: 'ssh-key03', value: '3' }
    ];

    zones;

    mirrors = [];

    versions = [];

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

    cpuTypes = [];

    memTypes = [];

    netTypes = [{
        label: '经典网络',
        value: '1',
        selected: true
    }, { // TODO 需要查询用户是否创建了私有网络;如果没有,则禁用.
        label: '私有网络',
        value: '2',
        disabled: true,
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
        disabled: true,
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
        disabled: true,
        selected: false
    }, {
        label: '共享镜像',
        value: '3',
        disabled: true,
        selected: false
    }, {
        label: '市场镜像',
        value: '4',
        disabled: true,
        selected: false
    }];

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

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

        this.reInitMirrorVersion();

        $(this.uiMirrors).dropdown({
            onChange: () => {
                this.getTotalConfig();
                this.reInitMirrorVersion();
            }
        });

        $(this.uiPwd).checkbox({
            onChecked: () => {
                this.authType = '1';
                this.pwdValidate();
            }
        });
        $(this.uiSshKey).checkbox({
            onChecked: () => {
                this.authType = '2';
                this.sshKeyValidate();
            }
        });

        this.pwdValidate();

        this.initMemTypes(this.getSelectedItem(this.cpuTypes));

        $(this.modal).modal({
            closable: false,
            detachable: false,
            context: '.nx-body',
            onShow: () => {
                this.reset();
                this.init();
                this.getTotalConfig();
            },
            onApprove: () => {

            }
        });

    }

    init() {

        this.http.fetch(nsApi.url('region.listName.get', {
                level: 1 // TODO...
            }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                this.zones = data;
            });

        this.http.fetch(nsApi.url('flavor.listMemory.get'))
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                let mems = [];
                _.each(data, (item) => {
                    mems.push({
                        label: `${item}GB`,
                        value: item,
                        disabled: true,
                        selected: _.head(data) == item
                    });
                });
                this.memTypes = mems;

                this.http.fetch(nsApi.url('flavor.listCpu.get'))
                    .then((resp) => {
                        return resp.json();
                    }).then((data) => {

                        let cpus = [];
                        _.each(data, (item) => {

                            let isFirst = _.head(data) == item;

                            let mems = [];
                            cpus.push({
                                label: `${item}核`,
                                value: item,
                                selected: isFirst,
                                memTypes: mems
                            });

                            this.http.fetch(nsApi.url('flavor.listMemoryByCpu.get', {
                                    cpu: item
                                }))
                                .then((resp) => {
                                    return resp.json();
                                }).then((data) => {

                                    if (isFirst) {
                                        _.each(this.memTypes, (item) => {
                                            item.disabled = !_.find(data, { value: item.value });
                                        });
                                    }

                                    _.each(data, (item) => {
                                        mems.push({
                                            label: `${item.value}GB`,
                                            value: item.value,
                                            selected: _.head(data) == item
                                        });
                                    });
                                });

                        });

                        this.cpuTypes = cpus;
                    });
            });

        this.http.fetch(nsApi.url('image.listName.get', {
                type: 1 // TODO...
            }))
            .then((resp) => {
                return resp.json();
            }).then((data) => {

                let mirrs = [];
                _.each(data, (item) => {

                    let vers = [];
                    mirrs.push({
                        label: item,
                        value: item,
                        versions: vers
                    });

                    this.http.fetch(nsApi.url('image.listVersion.get', {
                            name: item
                        }))
                        .then((resp) => {
                            return resp.json();
                        }).then((data) => {
                            _.each(data, (item) => {
                                vers.push({
                                    label: item.name,
                                    value: item.id
                                });
                            });
                        });
                })

                this.mirrors = mirrs;
            });
    }

    initZonesHandler(last) {
        if (last) {
            $(this.uiZones).dropdown().dropdown('set selected', this.zones[0].id);
        }
    }

    sshKeyValidate() {
        $(this.uiSettings).form({
            on: 'blur',
            inline: true,
            fields: {
                count: {
                    identifier: 'count',
                    rules: [{
                        type: 'empty',
                        prompt: '购买数量不能为空!'
                    }, {
                        type: 'integer[1..10]',
                        prompt: '一次创建主机数量必须是介于1到10的整数!'
                    }]
                }
            }
        });
    }

    pwdValidate() {
        $(this.uiSettings).form({
            on: 'blur',
            inline: true,
            fields: {
                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: '登录密码不能为空!'
                    }, {
                        type: 'regExp[/^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{8,30}$/]',
                        prompt: '登录密码不符合要求的安全规则限制!'
                    }]
                },
                rePassword: {
                    identifier: 'rePassword',
                    rules: [{
                        type: 'match[password]',
                        prompt: '两次密码输入不一致!'
                    }]
                },
                count: {
                    identifier: 'count',
                    rules: [{
                        type: 'empty',
                        prompt: '购买数量不能为空!'
                    }, {
                        type: 'integer[1..10]',
                        prompt: '一次创建主机数量必须是介于1到10的整数!'
                    }]
                }
            }
        });
    }

    reInitMirrorVersion() {
        $(this.uiVersions).dropdown('clear');
        let selected = this.getDropDownSelectedItem(this.uiMirrors, this.mirrors);
        if (!selected) {
            return;
        }
        this.versions = selected.versions;
        _.delay(() => {
            $(this.uiVersions).dropdown({
                onChange: () => {
                    this.getTotalConfig();
                }
            }).dropdown('set selected', '1');
        }, 100);
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
        $(this.modal).modal('show');
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

        this.steps = $(this.stepsContainer).find('.steps .step');
        this.tabs = $(this.stepsContainer).find('.tab');
        this.stepCnt = this.steps.size();

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

        this.steps = $(this.stepsContainer).find('.steps .step');
        this.tabs = $(this.stepsContainer).find('.tab');
        this.stepCnt = this.steps.size();

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

        if (!$(this.uiSettings).form('is valid')) {
            toastr.error('表单验证不合法,请修改表单不合法输入!');
            return;
        }
        console.log(this.getTotalConfig());
        // toastr.info(JSON.stringify(this.getTotalConfig()));
        $(this.modal).modal('hide');
    }

    btnGrpSelectHandler(type) {
        if (type == 'cpu') {
            this.initMemTypes(this.getSelectedItem(this.cpuTypes));
        }

        this.getTotalConfig();
    }

    initMemTypes(selectedCpu) {

        if (!selectedCpu) {
            return;
        }

        let mtypes = selectedCpu.memTypes;
        _.each(this.memTypes, (item) => {
            let match = _.find(mtypes, { 'value': item.value });
            item.disabled = !match;
            item.selected = match ? match.selected : false;
        })
    }

    createSshkeyHandler() {
        this.uiSshkeyCreateModal.show((result) => {
            console.log(result);
        });
    }

}
