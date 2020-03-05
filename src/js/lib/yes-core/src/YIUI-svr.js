import jstz from 'jstz';
import { YIUI } from './YIUI-base';
import { DummyDocument as document, lodash as $ } from 'yes-common';
import Encrypt from './utils/encrypt';
import Base64 from 'base-64';
import { logined, logouted } from './actions';
import qs from 'qs';
import objecthash from 'object-hash';
import getDispatcher from './dispatchers';
import { getSession, setSession, setUserInfo, setServerDate, setParas } from "./session";
import { YESException } from './exceptions';
import pako from 'pako';
import newFetch from './fetch';

const Svr = {};
export default Svr;
Svr.Request = (function () {
    var transData = function (data) {
        if (data == null) {
            return data;
        }

        var json = $.toJSON(data);
        return data;

        // 传送数据 长度 大于 20000 开启压缩   20000长度的数据传输在30K 左右
        if (json.length < 20000) {
            return data;
        }
        var postData = {};
        postData.yigoData = YIUI.Base64.encode64(pako.gzip(json));
        return postData;
    };
    var d_msg = {
        count: 0,
        time: 0,
        size: 0,
    };
    var getMSG = function (time, size) {
        var svr_msg = Svr.MSG = Svr.MSG || d_msg;
        svr_msg.count++;
        svr_msg.time += time;
        svr_msg.size += size;
        console.log(svr_msg);
    };
    var convertResult = function (msg) {
        var ret = msg.data;
        if (msg.type === YIUI.JavaDataType.STR_USER_DATATABLE) {
            ret = YIUI.DataUtil.fromJSONDataTable(ret);
        } else if (msg.type === YIUI.JavaDataType.STR_USER_DOCUMENT) {
            ret = YIUI.DataUtil.fromJSONDoc(ret);
        }
        return ret;
    };
    const requestPromises = {

    };
    var Return = {
        upload: async function (file, options = {}, fileName) {
            const url = Svr.SvrMgr.AttachURL;
            let data = new FormData();
            data.append('file', file, fileName || file.name);
            for (let key in options) {
                data.append(key, options[key]);
            }
            const request = {
                method: 'post',
                credentials: 'include',
                body: data,
            }
            const response = await fetch(url, request);
            let result = await response.json();
            if (result.success == null || result.success) {
                result = convertResult(result);
            } else {
                if (data.error.error_code === -2146828281) {//超时
                    getDispatcher().dispatch(logouted());
                }
                throw new YESException(data.error.error_code, '', data.error.error_info);
            }
            return result;
        },
        getData: async function (params, url, convert = true) {
            return await Return.getAsyncData(url || Svr.SvrMgr.ServletURL, params, convert);
        },
        getSyncData: async function (url, params, convert = true, useCache = true) {
            const requestKey = objecthash(params);
            let requestPromise = null;
            let requestOwner = true;
            if (requestPromises[requestKey]) {
                console.log('Request Cache hit!');
                requestPromise = requestPromises[requestKey];
                requestOwner = false;
            } else {
                params.mode = params.mode || 2;
                var returnObj = null;
                var locale = window.navigator.language || window.navigator.browserLanguage;
                var tz = jstz.determine();
                var timezone = tz.name();
                // var timezone='Indian/Maldives';
                params.locale = locale;
                params.timezone = timezone;
                const clientID = getSession();
                if (clientID) {
                    params.clientID = clientID;
                }
                // try {
                var request = {
                    method: 'post',
                    credentials: 'include',
                    body: qs.stringify(transData(params)),
                    headers: {
                        'Content-type': "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                };
                // var response = await fetch(url, request);
                let qq = async () => {
                    var response = await newFetch(fetch(url, request), 20000);
                    return await response.json();
                }
                requestPromise = qq();
                requestPromises[requestKey] = requestPromise;
            }
            try {
                var data = await requestPromise;
            } finally {
                if (requestOwner) {
                    if (useCache) {
                        setTimeout(() => {
                            delete requestPromises[requestKey];
                        }, 2000);
                    } else {
                        delete requestPromises[requestKey];
                    }
                }
            }
            // params.mode = 1;
            // var returnObj = null;
            // var locale = window.navigator.language || window.navigator.browserLanguage;
            // var tz = jstz.determine();
            // var timezone = tz.name();
            // params.locale = locale;
            // params.timezone = timezone;
            // params.clientID = getSession();
            // // try {
            // var request = {
            //     method: 'post',
            //     body: qs.stringify(transData(params)),
            //     headers: {
            //         'Content-type': "application/x-www-form-urlencoded; charset=UTF-8",
            //     },
            // };
            // var response = await fetch(url, request);
            // var data = await response.json();
            // getData(request, data);
            if (data.success == null || data.success) {
                data = convert ? convertResult(data) : data.data;
            } else {
                if (data.error.error_code === -2146828286 || data.error.error_code === -2146828281) {//超时
                    getDispatcher().dispatch(logouted());
                } else if (data.error.error_code === -2147090387) {//图片请求错误返回值
                    return data
                }
                throw new YESException(data.error.error_code, '', data.error.error_info);
            }
            return data;
        },

        getAsyncData: async function (url, params, sucCallback, errorCallback) {
            const result = await Return.getSyncData(url, params, sucCallback, errorCallback);
            // console.log(result);
            return result;
            //             params.mode = 1;
            //             var returnObj = null;
            //             var locale = window.navigator.language || window.navigator.browserLanguage;
            //             var tz = jstz.determine();
            //             var timezone = tz.name();
            //             params.locale = locale;
            //             params.timezone = timezone;

            //             var old_t = new Date().getTime();

            //             $.ajax({
            //                 contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            //                 type: "post",
            //                 url: url,
            //                 data: transData(params),
            //                 async: true,
            //                 dataType: 'json',
            //                 beforeSend: function () {
            //                     $(".loading").show();
            //                     $(".image").css({
            //                         top: $(window).height() / 2,
            //                         left: $(window).width() / 2
            //                     });
            //                 },
            //                 success: function (msg) {
            //                     if ($.isFunction(sucCallback)) {
            //                         returnObj = sucCallback(msg.data);
            //                     } else {
            //                         returnObj = msg.data;
            //                     }

            //                     var cur_t = new Date().getTime();
            //                     var t = cur_t - old_t;
            //                     getMSG(t, 0);
            //                 },
            //                 complete: function (xhr) {
            //                     xhr = null;
            //                     $(".loading").hide();
            //                 },
            //                 error: function (xhr, textStatus, exception) {
            //                     $(".loading").hide();
            //                 	if(xhr.readyState == 0) {
            //                 		$.error("请求状态未初始化，检查服务器连接！");
            //                 		return;
            //                 	}
            //                     if ($.isFunction(errorCallback)) {
            //                         //重载错误提示方法
            //                     } else {
            //                         var error = xhr.responseJSON.error;
            //                         var jsonObj = xhr.responseJSON.data;
            //                         if (jsonObj) {
            //                             for (var i = 0; i < jsonObj.length; i++) {
            //                                 var changedObj = jsonObj[i];
            //                                 var dealCmd = changedObj["cmd"];
            //                                 var pFormID = changedObj["pFormID"];
            //                                 var resultObj = changedObj["value"];
            //                                 if (dealCmd == "diff") {
            //                                     YIUI.UIUtil.diffForm(pFormID, resultObj);
            //                                 }
            //                             }
            //                         }

            // //                        var showMessage = 'Error occured: error_code=' + error.error_code + ', error_info=' + error.error_info;
            //                         var showMessage = error.error_info;
            //                         $.error(showMessage);

            // //		                var dialog = $("<div></div>").attr("id", "error_dialog");
            // //		                var showMessage = 'Error occured: error_code=' + error.error_code + ', error_info=' + error.error_info;
            // //		                dialog.modalDialog(showMessage, {title: "错误", showClose: true, type: "error", height: 200, width: 400});
            //                         return;
            //                     }
            //                 }
            //             });
            //             return returnObj;
        },
    };
    return Return;
})();/**
 * Created with JetBrains WebStorm.
 * User: 陈志盛
 * Date: 14-1-8
 * Time: 下午2:00
 * 向服务器发送相关请求及参数，获取返回值进行处理
 */
//  var Svr = Svr || {};
Svr.SvrMgr = (function () {
    var location_pathname = document.location.pathname;
    while (location_pathname.indexOf('/') == 0) location_pathname = location_pathname.substr(1);
    var baseurl = unescape(location_pathname.substr(0));
    var service = baseurl.substring(0, baseurl.indexOf('/'));
    var Return = {
        Service: {
            Authenticate: 'Authenticate',
            LoadTreeMenu: 'LoadTreeMenu',
            DealWithPureForm: 'DealWithPureForm',
            DeleteAttachment: 'DeleteAttachment',
            GetPublicKey: 'GetPublicKey',
            PureFormData: 'PureFormData',
            DelFormData: 'DeleteData',
            GoToPage: 'GoToPage',
            PureDictView: 'PureDictView',
            PureViewMap: 'PureViewMap',
            PureTreeEvent: "PureTreeEvent",
        },  // 静态公有属性
        EventType: {
            Click: 0,
            DBLClick: 1,
            GainFocus: 2,
            LostFocus: 3,
            EnterPress: 4,
            Expand: 5,
            Collapse: 6,
            GotoPage: 7,
            DictViewSearch: 8,
            CellClick: 9,
            CellSelect: 10,
            RowDelete: 11,
            RowInsert: 12,
            RowChange: 13,
            ValueChanged: 14,
            RowClick: 15,
            RowDblClick: 16,
        },

        doPureTreeEvent: function (paras, success) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.PureTreeEvent,
            }, paras);
            return doCmd(paras, null, success);
        },
        async loadTreeMenu(paras) {
            paras = $.extend({
                async: false,
                url: Return.ServletURL,
                service: Return.Service.LoadTreeMenu,
            }, paras);
            return await doCmd(paras);
        },

        dealWithPureForm(paras, succuss) {
            paras = $.extend({
                async: true,
                url: Return.ServletURL,
                service: Return.Service.DealWithPureForm,
            }, paras);
            return doCmd(paras, null, succuss);
        },

        deleteAttachment(paras) {
            paras = $.extend({
                url: Return.AttachURL,
                service: Return.Service.DeleteAttachment,
            }, paras);
            doCmd(paras);
        },
        async syncServerDate() {
            var paras = {};
            paras.service = "DateService";
            paras.cmd = "ServerDate";
            var result = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
            setServerDate(result);
        },
        doLogin: async function (username, password, sessionPara, mode, opts) {

            // var rsa = new RSAKey();
            var publicKey = await Svr.SvrMgr.getPublicKey({ async: false });
            // rsa.setPublic(publicKey.modulus, publicKey.exponent);

            var loginInfo = {};
            loginInfo.user = username;
            loginInfo.password = password;
            loginInfo.mode = mode;

            var data = Encrypt.current(publicKey.modulus, publicKey.exponent, $.toJSON(loginInfo));
            data = Base64.encode(data);

            opts = $.extend({
                url: Return.ServletURL,
                logininfo: data,
                paras: $.toJSON(sessionPara),
                cmd: 'Login',
                service: Return.Service.Authenticate,
            }, opts);
            // var success = function(result) {
            //     if (result) {
            //         if (opts.cmd == "Login") {
            //             $.cookie("userName", result.Name);
            //             var time = result.Time;
            //             var date = new Date(time);
            //             var dateStr = date.Format("yyyy/MM/dd HH:mm:ss");
            //             $.cookie("login_time", dateStr);
            //             if(result.SessionParas) {
            //             	$.cookie("sessionParas", result.SessionParas);
            //             }
            //         }
            //         location.reload();
            //     }
            // };
            const result = await doCmd(opts);
            document.clientID = result.clientID;
            await setSession(result.clientID);
            if (result.SessionParas) {
                await setParas(JSON.parse(result.SessionParas));
            }
            const userinfo = {
                id: result.UserID,
                name: result.Name,
                clientID: result.clientID,
            };
            await setUserInfo(userinfo);
            await Return.syncServerDate();
            getDispatcher().dispatch(logined(userinfo));
            return result;
        },

        async doLogout(paras) {
            //	        YIUI.Print.delAll();
            paras = $.extend({
                url: Return.ServletURL,
                cmd: 'Logout',
                service: Return.Service.Authenticate,
            }, paras);
            var success = function (result) {
                if (result) {
                    if (paras.cmd == 'Login') {
                        $.cookie('userName', result.Name);
                    }
                    //                    location.href = $.cookie("url");
                    window.location.reload();
                }
            };
            return await doCmd(paras, null);
        },

        getPublicKey: async function (paras) {
            paras = $.extend({
                url: Return.ServletURL,
                isWeb: true,
                service: Return.Service.GetPublicKey
            }, paras);
            return await doCmd(paras, null);
        },

        dealWithPureData(paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.PureFormData,
            }, paras);
            return doCmd(paras);
        },

        delPureData: function (paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.DelFormData,
            }, paras);
            return doCmd(paras);
        },

        loadFormData(paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.PureFormData,
            }, paras);
            return doCmd(paras);
        },
        doGoToPage: function (paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.GoToPage,
            }, paras);
            return doCmd(paras);
        },
        doDictViewEvent: function (paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.PureDictView,
            }, paras);
            return doCmd(paras);
        },

        doMapEvent: function (paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: Return.Service.PureViewMap,
            }, paras);
            return doCmd(paras);
        },

        cutImg: function (paras) {
            paras = $.extend({
                url: Return.ServletURL,
                service: "CutImage",
            }, paras);
            return doCmd(paras);
        },
        saveFormData: async function (paras, form, success) {
            processPara(form);
            paras = $.extend({
                url: Return.ServletURL
            }, paras);
            return await doCmd(paras, null, success);
        },
        getErrorMsg: async function (code, args) {
            if (code === -1) {
                return args || 'Server unexpected exception!';
            }
            let paras = {
                url: Return.ServletURL,
                service: "PureException",
                code
            };
            if (args != null && args != undefined) {
                paras.args = args;
            }
            return await doCmd(paras);
        }
    };
    // Return.ServletURL = [window.location.protocol, '//', window.location.host, '/', service, '/', 'servlet'].join('');
    // Return.UIProxyURL = [window.location.protocol, '//', window.location.host, '/', service, '/', 'uiproxy'].join('');
    // Return.AttachURL = [window.location.protocol, '//', window.location.host, '/', service, '/', 'attach'].join('');
    var doCmd = async function (paras, rootDom, success, error) {    // 静态私有方法
        var returnObj;
        if (paras.async == true) {
            returnObj = await Svr.Request.getAsyncData(paras.url, paras, success, error);
        } else {
            returnObj = await Svr.Request.getSyncData(paras.url, paras, success, error);
        }
        return returnObj;
    };
    var processPara = function (form) {
        if (form != null) {
            var paraCollection = form.getParaCollection();
            if (paraCollection != null) {
                for (var i = 0, len = paraCollection.length; i < len; i++) {
                    var para = paraCollection[i], value;
                    switch (para.type) {
                        case YIUI.ParameterSourceType.CONST:
                            value = para.value;
                            break;
                        case YIUI.ParameterSourceType.FORMULA:
                            value = form.eval(para.formula, cxt);
                            break;
                    }
                    form.setPara(para.key, value);
                }
            }
        }
    };
    return Return;
})();

// YIUI.DictService = (function () {
//     var Return = {
// 		/**
// 		 * 获取所有父节点ID
// 		 */
//         getAllParentID: function (itemKey, itemDatas, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.itemDatas = $.toJSON(itemDatas);
//             data.service = 'DictService';
//             data.cmd = 'GetParentPath';
//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 根据父节点获取子节点
// 		 */
//         getDictChildren: function (itemKey, itemData, filter, stateMask, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.itemData = $.toJSON(itemData);
//             if (filter != null) {
//                 data.filter = $.toJSON(filter);
//             }
//             data.service = 'WebDictService';
//             data.cmd = 'GetDictChildren';
//             data.stateMask = stateMask;

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 精确查找
// 		 */
//         locate: function (itemKey, field, value, filter, root, statMask, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             if (field != null) {
//                 data.field = field;
//             }
//             data.value = value;
//             if (filter != null) {
//                 data.filter = $.toJSON(filter);
//             }
//             data.root = $.toJSON(root);
//             data.statMask = statMask;

//             data.service = 'DictService';
//             data.cmd = 'Locate';

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 获取一个字典缓存
// 		 */
//         getItem: async function (itemKey, oid, statMask, callback) {
//             // var data = {};
//             // data.itemKey = itemKey;
//             // data.oid = oid;
//             // data.statMask = statMask;
//             // data.cmd = "GetItem";
//             // data.service = "WebDictService";

//             // var result = true;
//             return await CacheSystem.current.DictCache.get(`${itemKey}.${oid}`);
//             // let msg = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data);
//             // result = msg ? YIUI.DataUtil.fromJSONItem(msg) : true;
//             // return result;
//         },

// 		/**
// 		 * 模糊查询　用于dictQueryPane 与　链式字典的dictView
// 		 */
//         getQueryData: function (itemKey, startRow, maxRows, pageIndicatorCount, fuzzyValue, stateMask, filter, root, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.startRow = startRow;
//             data.maxRows = maxRows;
//             data.pageIndicatorCount = pageIndicatorCount;
//             data.value = fuzzyValue;
//             data.stateMask = stateMask;

//             if (filter != null) {
//                 data.filter = $.toJSON(filter);
//             }
//             if (root != null) {
//                 data.root = $.toJSON(root);
//             }
//             data.service = 'WebDictService';
//             data.cmd = 'GetQueryData';

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 直接输入文本时智能提示相关数据
// 		 */
//         getSuggestData: function (itemKey, suggestValue, statMask, filter, root, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.value = suggestValue;
//             data.statMask = statMask;
//             if (filter != null) {
//                 data.filter = $.toJSON(filter);
//             }
//             if (root != null) {
//                 data.root = $.toJSON(root);
//             }
//             data.service = 'WebDictService';
//             data.cmd = 'GetSuggestData';

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };
//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 获取当前节点的父节点ID
// 		 */
//         getParentID: function (itemKey, itemData, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.itemData = $.toJSON(itemData);
//             data.cmd = 'GetParentID';
//             data.service = 'WebDictService';

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 修改字典使用状态
// 		 */
//         enableDict: function (itemKey, oid, enable, allChildren, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.oid = oid;
//             if (typeof (enable) == undefined || enable == null) {
//                 enable = 1;
//             }
//             data.enable = enable.toString();
//             data.allChildren = allChildren;
//             data.cmd = 'EnableDict';
//             data.service = 'WebDictService';

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

// 		/**
// 		 * 根据字典itemKey id取caption
// 		 */
//         getCaption: function (itemKey, oid, callback) {
//             var result = true;
//             var data = {};
//             data.itemKey = itemKey;
//             data.oids = $.toJSON(oid);

//             data.cmd = 'getCaption';
//             data.service = 'WebDictService';

//             var success = function (msg) {
//                 if ($.isFunction(callback)) {
//                     callback(msg);
//                 } else {
//                     result = msg;
//                 }
//             };

//             Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, success);
//             return result;
//         },

//         getDictValue: async function (itemKey, oid, fieldKey, callback) {
//             // if (oid == undefined || oid == null) return null;
//             var item = await this.getItem(itemKey, oid);
//             return item.getValue(fieldKey);
//             // var result = true;
//             // var data = {};
//             // data.itemKey = itemKey;
//             // data.oid = oid.toString();
//             // data.fieldKey = fieldKey;

//             // data.cmd = 'GetDictValue';
//             // data.service = 'WebDictService';

//             // return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data);
//         },

//         getTreePath: function (itemKey, child) {
//             var paras = {
//                 service: 'DictService',
//                 cmd: 'GetParentPath',
//                 itemKey,
//                 itemData: $.toJSON(child),
//             };
//             var result = Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
//             return result;
//         },

//         getParentPath: function (itemKey, child) {
//             var paras = {
//                 service: 'DictService',
//                 cmd: 'GetParentPath',
//                 itemKey,
//                 itemData: $.toJSON(child),
//             };
//             var result = Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
//             return result;
//         },

//     };
//     return Return;
// })();

YIUI.DateFormat = (function () {
    var Return = {
        //日期 formatStr、onlyDate
        format: function (date, meta) {
            var text = "";
            if (date) {
                var formatStr = "yyyy-MM-dd HH:mm:ss";
                if (meta) {
                    if (meta.formatStr) {
                        formatStr = meta.formatStr;
                    }
                    if (meta.onlyDate) {
                        formatStr = formatStr.split(" ")[0];
                    }
                }


                var df = function (d, f) {
                    var o = {
                        "M+": d.getMonth() + 1, //月份         
                        "d+": d.getDate(), //日         
                        "h+": d.getHours() % 12 == 0 ? 12 : d.getHours() % 12, //小时         
                        "H+": d.getHours(), //小时         
                        "m+": d.getMinutes(), //分         
                        "s+": d.getSeconds(), //秒         
                        "q+": Math.floor((d.getMonth() + 3) / 3), //季度         
                        "S": d.getMilliseconds() //毫秒         
                    };

                    if (/(y+)/.test(f)) {
                        f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
                    }

                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(f)) {
                            f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        }
                    }

                    return f;
                }

                text = df(date, formatStr);
            }
            return text;
        }



    };
    return Return;
})();