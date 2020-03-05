import wx from 'wx';
import getJsConfig from './getJsConfig';

class WXPermissionVerification {
    constructor() {
        this.list = {};
    }

    register(jsApiList) {
        console.log(this.list)
        return new Promise((resolve, reject) => {
            const url = location.href;


            let interfaceList = jsApiList;
            if (typeof interfaceList === 'string') {
                interfaceList = jsApiList.split(',');
            }
            if (this.list[url]) {
                const everyInterfaceSuccess = interfaceList.every((interfaceItem) => this.list[url][interfaceItem]);
                if (everyInterfaceSuccess) {
                    resolve();
                    return;
                }
            }
            getJsConfig()
                .then((jsConfig) => {
                    jsConfig.jsApiList = jsApiList;
                    jsConfig.debug = false;
                    return jsConfig;
                })
                .then((jsConfig) => {
                    wx.config(jsConfig);
                    wx.ready(() => {
                        this.list[url] = {};
                        interfaceList.forEach((interfaceItem) => {
                            this.list[url][interfaceItem] = true;
                        });
                        resolve();
                        return;
                    });
                    wx.error(() => {
                        reject();
                    });
                });
        });

    }
}

const wXPermissionVerification = new WXPermissionVerification();
export default wXPermissionVerification;
