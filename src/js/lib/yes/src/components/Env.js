/*
 * @Author: gmf
 * @Date:   2016-05-13 11:17:16
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-05-13 16:16:24
 */

import {Svr} from "../yes_ext";
// import {login} from "./wechat/WechatAuthProxy";
// import Wechat from "./wechat/Wechat";
export var Env = 'browser';
export function isWeixin() {
    return Env == 'wechat';
}
export function isCordova() {
    return Env == 'cordova';
}
export function isBrowser() {
    return Env == 'browser';
}
// function isWeiXin() {
//     var ua = window.navigator.userAgent.toLowerCase();
//     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//         return true;
//     } else {
//         return false;
//     }
// }
if (window.cordova) {
    Env = 'cordova';
}
// if (isWeiXin()) {
//     Env = 'wechat';
// }
export async function doLogin(user, pwd) {
    // if (isWeixin() && Wechat.isInited()) {
    //     return await login(user, pwd);
    // } else {
        return await Svr.SvrMgr.doLogin(user, pwd);
    // }
}
