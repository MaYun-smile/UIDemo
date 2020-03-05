/*
 * @Author: gmf
 * @Date:   2016-05-13 09:38:49
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-05-23 11:02:56
 */

import wx from "yes/dist/components/wechat/wechat.config";
import {isCordova, isWeixin} from "yes/dist/components/Env";
export default function scanQRCode() {
    if (isWeixin()) {
        return new Promise(function (resolve, reject) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: (res) => {
                    var resultStr = res.resultStr;
                    resolve(resultStr);
                },
                fail: (err) => {
                    reject(err);
                },
            });
        });
    }
    if (isCordova()) {
        return new Promise(function (resolve, reject) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) {
                        resolve(result.text);
                    }
                },
                function (error) {
                    reject(error);
                },
                {
                    'formats': 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
                }
            );
        });
    }
    return Promise.reject('Current platform not support QRScan!');
}
