import {
    bindable,
    containerless
}
from 'aurelia-framework';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
@containerless
export class Menu {

    loginUser;

    /**
     * 构造函数
     */
    constructor(getHttp) {
        this.http = getHttp();
    }

    /**
     * 当数据绑定引擎绑定到视图时被调用
     * @param  {[object]} ctx 视图绑定上下文环境对象
     */
    bind(ctx) {
        this.http.fetch(nsApi.url('user.userInfo.get'))
            .then((resp) => {
                if (resp.ok) {
                    return resp.json().then((data) => {
                        nsCtx.userInfo = data.entity;
                        this.loginUser = nsCtx.userInfo;
                    });
                }

                return resp;
            });
    }

    /**
     * 当视图被附加到DOM中时被调用
     */
    attached() {
        nsCtx.topMenuHeight = $(this.uiMenu).height();
        $([this.uiAccount]).dropdown({
            action: 'hide',
            on: 'hover'
        });
        $([this.uiZone]).dropdown().dropdown('set selected', 'sh');

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

    logoutHandler() {
        Cookie.remove(nsCons.ACCESS_TOKEN);
        nsCtx.accessToken = null;
        window.location.href = "/login/login.html"; // TODO 临时跳转路径
    }
}
