/**
 * 程序初次加载启动,进行一些初始化操作:
 */

import { HttpClient } from 'aurelia-fetch-client';
import config from './config';

export function configure(aurelia, params) {

    config.context(aurelia).initHttp().initToken().initToastr();

    // // 异步加载初始化数据, 返回Promise对象延迟页面渲染
    // return new Promise((resolve, reject) => {
    //     $.when(
    //         $.get(nsApi['user.userInfo.get']) // 获取用户信息
    //     ).done((resp, resp2, resp3) => {

    //         // 设置ctx环境变量
    //         _.initCtxUser(resp[0].entity);

    //         resolve();

    //     });
    // });
}
