import React from 'react';
import confirm from './confirm'
import alert from './alert'
import showToast from './showToast'
const RSAKey = require('react-native-rsa');
const base64 = require('base-64');
export default {
    encrypt:function(modulus,exponent,text){
        const rsa = new RSAKey();
        rsa.setPublic(modulus, exponent);
        return rsa.encrypt(text);
    },
    base64Encode: base64.encode,
    alert,
    confirm,
    showToast,
}