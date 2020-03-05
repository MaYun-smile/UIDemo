/*
 * @Author: gmf
 * @Date:   2016-07-22 10:05:46
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-07-22 10:06:25
 */

// import alert from './alert';
import RSAKey from './rsa/rsa';
import base64 from 'base-64';
import confirm from 'yes-native/dist/util/confirm';
import alert from 'yes-native/dist/util/alert';
import getLanguage from './getLanguage';
import showToast from './showToast';
import selectContact from './selectContact';
import platformList from '../platform';
import CordovaPlugin from './CordovaPlugin';


let platformFunction = platformList.common;
if (process.env.YIGO_PLATFORM) {
    platformFunction = platformList[process.env.YIGO_PLATFORM];
}


export {
    getLanguage,
};

export default {
    alert,
    // alert:(msg)=>{
    //     window.alert(msg);
    // },
    encrypt(modulus, exponent, text) {
        const rsa = new RSAKey();
        rsa.setPublic(modulus, exponent);
        return rsa.encrypt(text);
    },
    base64Encode: base64.encode,
    confirm,
    getLanguage,
    ...platformFunction,
    showToast,
    selectContact,
    CordovaPlugin
};
