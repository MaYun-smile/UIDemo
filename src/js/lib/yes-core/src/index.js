export { DataDef } from './YIUI-common';
import './formbuilder';
import Svr from './YIUI-svr';
export { default as Svr } from './YIUI-svr';
export { YIUI, UI } from './YIUI-base';
export { injectDispatcher } from './dispatchers';
export * from './cache';
export { View } from './YIUI-parser';
export { default as cacheSystem } from './cache';
import './component/controls';
export { injectEncrypt } from './utils/encrypt';
export { injectConfirm } from './utils/confirm';
export * from './session';
export * from './exceptions';
export * from './actions';
/**
 * 用于注入yigo2服务器的根地址
 * @param {yigo2服务器的根地址} server
 */
export function injectServer(server) {
    Svr.SvrMgr.ServletURL = `${server}/servlet`;
    Svr.SvrMgr.UIProxyURL = `${server}/uiproxy`;
    Svr.SvrMgr.AttachURL = `${server}/attach`;
    Svr.SvrMgr.ServerURL = server;
}
