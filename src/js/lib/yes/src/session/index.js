/*
 * @Author: gmf
 * @Date:   2016-04-21 15:54:32
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-04-22 11:30:58
 */

import memoryAdapter from './memoryAdapter';
import { DummyDocument as document } from 'yes-common';
var sessionKey = 'yigomobile';
var clientId = '';
var userInfo = null;
var adapter = memoryAdapter;
let timeSpan = 0;
let loaded = false;

export function InitSession(key,sessionAdapter) {
    if(sessionAdapter)
        adapter = sessionAdapter;
    sessionKey = key;
    loadHistory();
}
export async function loadHistory(){
    if(loaded){
        return;
    }
    clientId = await adapter.getItem(sessionKey);
    userInfo = await adapter.getItem(sessionKey + "_userinfo");
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
export async function setUserInfo(userInfo) {
    userInfo = userInfo;
    await adapter.setItem(sessionKey + '_userinfo', userInfo);
}
export async function setServerDate(dt){
    //记录服务器和当前机器之间的事件差，用于后续计算服务器事件
    const now = Date.now();
    timeSpan = dt - now;
}
export function getServerDate(){
    return new Date(Date.now() + timeSpan);
}