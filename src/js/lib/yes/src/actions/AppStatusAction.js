/*
 * @Author: gmf
 * @Date:   2016-03-10 10:23:12
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-06 09:52:45
 */

export function Logining(loginInfo) {
    return {
        type: 'LOGINING',
        loginInfo,
    };
}
export function Logined(userinfo) {
    return {
        type: 'LOGINED',
        userinfo,
    };
}
export function reloadForm(key){
    return {
        type:'RELOADFORM',
        key
    }
}
export function Logouted() {
    return {
        type: 'LOGOUTED',
    };
}
export function PostChange() {
    return {
        type: 'CHANGED',
    };
}
export function StopEvent() {
    return {
        type: 'STOPEVENT',
    };
}
export function EnableEvent() {
    return {
        type: 'ENABLEEVENT',
    };
}
export function Error(err) {
    return {
        type: 'ERROR',
        error: err.error || err,
    };
}
export function Warn(err) {
    return {
        type: 'WARN',
        error: err.error || err,
    };
}
export function OpenDrawer(openState) {
    return {
        type: 'OPENDRAWER',
        opendrawer: openState,
    };
}
