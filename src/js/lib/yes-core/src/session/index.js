/*
 * @Author: gmf
 * @Date:   2016-04-21 15:54:32
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-04-22 11:30:58
 */

import memoryAdapter from './memoryAdapter'
import { DummyDocument as document } from "yes-common";
import getDispatcher, { ready } from '../dispatchers';
import { changeuser } from '../actions';
var sessionKey = 'yigomobile';
var clientId = '';
var userInfo = null;
var adapter = memoryAdapter;
let timeSpan = 0;
let loaded = false;
let locale = 'zh-CN';
let paras = {};

export async function InitSession(key, sessionAdapter) {
    if (sessionAdapter)
        adapter = sessionAdapter;
    sessionKey = key;
    await loadHistory();
}
export async function loadHistory() {
    if (loaded) {
        return;
    }
    clientId = await adapter.getItem(sessionKey);
    userInfo = await adapter.getItem(sessionKey + "_userinfo");
    paras = await adapter.getItem(sessionKey + "_sessionParas");
    document.clientID = clientId;
    loaded = true;
}
export function getSession() {
    return clientId;
}
export function getUserInfo() {
    return userInfo;
}
export async function setSession(clientID) {
    clientId = clientID;
    document.clientID = clientID;
    await adapter.setItem(sessionKey, clientID);
}
export async function setUserInfo(ui) {
    userInfo = ui;
    await adapter.setItem(sessionKey + '_userinfo', userInfo);
    console.log('setUserInfo');
    getDispatcher().dispatch(changeuser(userInfo));
}
export async function setParas(p) {
    paras = p;
    await adapter.setItem(sessionKey + '_sessionParas', p);
}
export function getParas() {
    return paras;
}
export async function setServerDate(dt) {
    //记录服务器和当前机器之间的事件差，用于后续计算服务器事件
    const now = Date.now();
    timeSpan = dt - now;
}
export function getServerDate() {
    return new Date(Date.now() + timeSpan);
}
export function clear() {
    clientId = '';
    userInfo = null;
    getDispatcher().dispatch(changeuser(userInfo));
}
export function setLocale(newLocale) {
    locale = newLocale;
}
export function getLocale() {
    return locale;
}

ready(() =>
    getDispatcher().register((action) => {
        switch (action.type) {
            case 'CHANGELANGUAGE':
                locale = action.language;
                break;
            default:
        }
    })
);
