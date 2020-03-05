import * as yes from "./yes";
import EventEmitter from "eventemitter3";
import AppDispatcher from "./dispatchers/AppDispatcher";
import empty from "empty";
import { default as HashHistory } from "./history";
import util from "./util";
import { DummyDocument as document, lodash as $ } from "yes-common";
import YESBillFormWrap from "./components/YESBillFormWrap";
import BillformStore from './stores/BillFormStore';
import { cacheSystem } from 'yes-core';

export const YIUI = yes.YIUI;
export const UI = yes.UI;
export const Svr = yes.Svr;

const DataDef = yes.DataDef;
var View = yes.View;

// require('./subdetailutil');
// require('./gridsumutil');

var YESMobile = {};

window.yes = yes;

export default YESMobile;

export var Util = util;
//
// $.toJSON = JSON.stringify;
//
// YESMobile.resetServerUrl = function (server) {
//     YESMobile.server = server;
//     Svr.SvrMgr.ServletURL = server + '/servlet';
//     Svr.SvrMgr.UIProxyURL = server + '/uiproxy';
//     Svr.SvrMgr.AttachURL = server + '/attach';
// }

YIUI.GlobalMessageBus = new EventEmitter();
// Object.assign(Svr.SvrMgr, {
//     dealMobileLoadForm: async function (paras) {
//         paras = $.extend({
//             async: true,
//             url: Svr.SvrMgr.ServletURL,
//             service: 'WebMetaService',
//             cmd: 'GetForm',
//         }, paras);
//         const result = await UIOptCenter.awaitDoCmd(paras);
//         return result;
//     },
//     dealMobileLoadFormData: async function (form, oid) {
//         processPara(form);
//         var paras = form != null ? form.getParas() : null;
//         var params = {
//             cmd: 'LoadData',
//             OID: oid ? oid : -1,
//             //form:form.toJSON(),
//             formKey: form.getFormKey(),
//             parameters: paras.toJSON(),
//             filterMap: $.toJSON(form.getFilterMap()),
//             condition: $.toJSON(form.getCondParas()),
//             operationState: form.getOperationState(),
//             noForm: true
//         }
//         return await Svr.SvrMgr.dealMobileLoadForm(params);
//     },
//     doLogin: async function (username, password, paras, sessionPara, mode, opts) {
//         //数据处理
//         if (!password) {
//             password = '';
//         }
//         var publicKey = await Svr.SvrMgr.getPublicKey({ async: false });
//         var loginInfo = {};
//         loginInfo.user = username;
//         loginInfo.password = password;
//         loginInfo.mode = 1;
//         var data = util.encrypt(publicKey.modulus, publicKey.exponent, $.toJSON(loginInfo));
//         data = util.base64Encode(data);
//         opts = $.extend({
//             url: Svr.SvrMgr.ServletURL,
//             logininfo: data,
//             paras: $.toJSON(sessionPara),
//             cmd: mode === 2 ? "GuestLogin" : "Login",
//             mode: 1,
//             service: Svr.SvrMgr.Service.Authenticate
//         }, opts);
//         return UIOptCenter.awaitDoCmd(opts);
//     },
//     loadFormData: function (paras) {
//         paras = $.extend({
//             url: Svr.SvrMgr.ServletURL,
//             service: Svr.SvrMgr.Service.PureFormData
//         }, paras);
//         return UIOptCenter.awaitDoCmd(paras);
//     },
//     getPublicKey: function (paras) {
//         paras = $.extend({
//             url: Svr.SvrMgr.ServletURL,
//             clientID: document.clientID,
//             isWeb: true,
//             service: Svr.SvrMgr.Service.GetPublicKey
//         }, paras);
//         return UIOptCenter.awaitDoCmd(paras, null);
//     },
//     doPureTreeEvent: function (paras) {
//         paras = $.extend({
//             url: Svr.SvrMgr.ServletURL,
//             clientID: document.clientID,
//             service: Svr.SvrMgr.Service.PureTreeEvent
//         }, paras);
//         return UIOptCenter.awaitDoCmd(paras);
//     },
//     dealWithPureForm: function (paras, succuss) {
//         paras = $.extend({
//             async: true,
//             url: Svr.SvrMgr.ServletURL,
//             clientID: document.clientID,
//             service: Svr.SvrMgr.Service.DealWithPureForm
//         }, paras);
//         return UIOptCenter.awaitDoCmd(paras);
//     },
//     dealWithPureData: function (paras, succuss) {
//         paras = $.extend({
//             async: true,
//             url: Svr.SvrMgr.ServletURL,
//             clientID: document.clientID,
//             service: Svr.SvrMgr.Service.PureFormData
//         }, paras);
//         return UIOptCenter.awaitDoCmd(paras);
//     },
//     getEmptyForm: function (paras, succuss) {
//         paras = $.extend({
//             async: true,
//             url: Svr.SvrMgr.ServletURL,
//             service: Svr.SvrMgr.Service.GetEmptyForm
//         }, paras);
//         return UIOptCenter.awaitDoCmd(paras);
//     },
//
// })

class FormContainer extends EventEmitter {
    constructor() {
        super();
        YIUI.GlobalMessageBus.on('showform', this.onShowForm, this);
    }

    onShowForm(form) {
        if (this.acceptForm(form)) {
            this.add(form);
        }
    }

    acceptForm(form) {
        return true;
    }

    add(form) {

    }

    close(formId) {
    }

    destroy() {
        YIUI.GlobalMessageBus.removeListener('showform', this.onShowForm, this);
    }
}

export class StackFormContainer extends FormContainer {

    constructor() {
        super(arguments);
        this.activeFormId = 0;
        this.rootFormKey = '';
        this.entryKey = '';
        this.formstack = [];
    }

    acceptForm(form) {
        //只有当activeFormId==form.pFormId的时候
        //或者form的入口
        if (form.pFormID == this.activeFormId ||
            (form.entryKey == this.entryKey && this.activeFormId == 0)) {
            return true;
        }
        return false;
    }

    canPopup() {
        return this.formstack.length >= 1;
    }

    popup() {
        if (this.activeFormId == 0)
            return false;
        this.close();
        return true;
    }

    add(form) {
        var container = $('<div></div>').addClass('stackform active ' + form.formKey).attr('id', 'form-' + form.formID);
        this.$el.append(container);
        form.rootPanel.render(container);
        if (this.activeFormId) {
            this.hide(this.activeFormId);
            this.formstack.push(this.activeFormId);
        }
        this.activeFormId = form.formID;
    }

    hide(formId) {
        if (formId == null)
            return;
        this.$el.find('#form-' + formId).addClass('hidden').removeClass('active');
    }

    show(formId) {
        this.$el.find('#form-' + formId).addClass('active').removeClass('hidden');
    }

    close() {
        var form = YIUI.FormStack.getForm(this.activeFormId);
        if (form) {
            form.rootPanel.destroy();
            YIUI.FormStack.removeForm(form);
            this.$el.find('#form-' + this.activeFormId).remove();
        }
        var newFormId = this.formstack.pop();
        this.activeFormId = newFormId;
        this.show(newFormId);
    }
}

export var YIUIContainer = (function (messagebus) {
    return {
        close: function (formId) {
            messagebus.trigger('closeform', formId);
        },
        add: function (form) {
            messagebus.trigger('showform', form);
        }
    }
})(YIUI.GlobalMessageBus);

const splitPara = function (para) {
    var mapCallback = {},
        len = para.length,
        key = "", deep = 0, start = 0;
    for (var i = 0; i < len; i++) {
        var c = para.charAt(i);
        if (c == ':' && deep === 0) {
            key = para.substring(start, i).trim();
        } else if (c == ',' && deep === 0) {
            start = ++i;
        } else if (c == '{') {
            if (deep === 0) {
                start = ++i;
            }
            deep++;
        } else if (c == '}') {
            deep--;
            if (deep == 0) {
                mapCallback[key] = para.substring(start, i);
            }
        }
    }
    return mapCallback;
};

const processPara = function (form) {
    if (form != null) {
        var paraCollection = form.getParaCollection();
        if (paraCollection != null) {
            for (var i = 0, len = paraCollection.length; i < len; i++) {
                var para = paraCollection[i];
                switch (para.type) {
                    case YIUI.ParameterSourceType.CONST:
                        value = para.value;
                        break;
                    case YIUI.ParameterSourceType.FORMULA:
                        value = form.eval(para.formula, { form: form });
                        break;
                }
                form.setParameter(para.key, value);
            }
        }
    }
};

View.FuncMap.put('Open',
    async function (name, cxt, args) {
        var form = cxt.form;
        var formKey = args[0], OID = args[1] || -1;
        // let mobileFormKey = await YIUI.BPMService.getAliasKey(1, formKey);
        // if (formKey == mobileFormKey) {
        HashHistory().push(`card/YES/${formKey}/${OID}/DEFAULT`);
        // } else {
        // HashHistory().push(`card/YESMOBILE/${formKey}/${OID}/DEFAULT`);
        // }
    }
);

View.FuncMap.put('Show',
    async function (name, cxt, args) {
        var form = cxt.form;
        var formKey = args[0], OID = args[1] || -1;
        // let mobileFormKey = await YIUI.BPMService.getAliasKey(1,formKey);
        // if(formKey==mobileFormKey){
        HashHistory().push(`card/YES/${formKey}/${OID}/EDIT`);
        // }else{
        // HashHistory().push(`card/YESMOBILE/${formKey}/${OID}/EDIT`);
        // }
    }
);

View.FuncMap.put('UpdateView',
    async function (name, ctx, args) {
        const form = ctx.form;
        YIUI.GlobalMessageBus.emit('updateview', form.formKey, form.getOID());
    }
);

View.FuncMap.put('New',
    async function (name, cxt, args) {
        const formKey = args[0];
        const pForm = cxt.form;
        if (formKey === 'OA_ShowWeb') {//预览文件
            const paras = splitPara(args[2]);
            // const form = cxt.form;
            const url = await pForm.eval(paras['URL'], cxt);
            // const fullUrl = `${Svr.SvrMgr.ServletURL}/../${url}`;
            AppDispatcher.dispatch({
                type: 'preview',
                url,
            });
            return;
        }
        let tsParas = args[1];
        if (tsParas) {
            tsParas = splitPara(tsParas);
            for (const key in tsParas) {
                const value = await pForm.eval(tsParas[key], cxt);
                pForm.setCallPara(key, value);
            }
        }

        const data = await YIUI.DocService.newDocument(formKey);
        // const document = await UIHandler.getEmptyDocument(formKey);
        const newOid = await YIUI.RemoteService.applyNewOID();
        data.oid = newOid;
        data.state = YIUI.DocType.NEW;
        const formUniqueKey = `${formKey}.${data.oid}`;
        data.key = formUniqueKey;
        await cacheSystem.current.FormDataCache.put(formUniqueKey, {
            key: formUniqueKey,
            data,
            time: Date.now(),
        });
        const billForm = await BillformStore.createDummyForm(formUniqueKey);
        billForm.form.pFormID = pForm.formID;
        const ff = billForm.form;
        await YIUI.FormParasUtil.processCallParas(pForm, ff);
        // await cacheSystem.current.FormDataCache.put(key, document);
        HashHistory().push(`card/YES/${formKey}/${data.oid}/NEW`);
    }
);

// View.FuncMap.put('Cancel',
//     async function (name, cxt, args) {
//         var formKey = cxt.form.formKey,
//             OID = cxt.form.OID;
//         var params = { formKey: formKey, oid: OID, cmd: "PureOpenForm", async: true };
//         if (cxt.form.getOperationState() == YIUI.Form_OperationState.New) {
//             HashHistory().goBack();
//         } else if (cxt.form.getOperationState() == YIUI.Form_OperationState.Edit) {
//             try {
//                 var jsonObj = await Svr.SvrMgr.dealWithPureForm(params);
//                 var form = new YESBillFormWrap(YIUI.FormBuilder.build(jsonObj));
//                 let key = Util.buildFormKey(formKey, jsonObj.form.OID);
//                 AppDispatcher.dispatch({
//                     type: 'RECEIVEFORMDATA',
//                     data: form,
//                     formKey: key,
//                 });
//             } catch (ex) {
//                 Util.processError(ex);
//             }
//         }
//     }
// );
var doMap = async function (name, cxt, args) {
    var form = cxt.form,
        mapKey = YIUI.TypeConvertor.toString(args[0]),
        tgtFormKey = YIUI.TypeConvertor.toString(args[1]);

    var mapWorkitemInfo = false;
    if (args.length > 2) {
        mapWorkitemInfo = YIUI.TypeConvertor.toBoolean(args[2]);
    }

    var postFormula = '';
    if (args.length > 3) {
        postFormula = YIUI.TypeConvertor.toString(args[3]);
    }

    await mapData(form, null, tgtFormKey, mapKey, mapWorkitemInfo, postFormula);
};

var mapData = async function (srcForm, tgtForm, tgtFormKey, mapKey, mapWorkitemInfo, postFormula) {
    var srcFormKey = srcForm.formKey,
        formDoc = srcForm.getDocument();

    var srcDoc = YIUI.DataUtil.toJSONDoc(formDoc, true);

    var tgtDoc = tgtForm ? tgtForm.getDocument() : null;
    if (tgtDoc) {
        tgtDoc = YIUI.DataUtil.toJSONDoc(tgtDoc);
    }

    const json = await new YIUI.DataMapService(srcForm).mapData(mapKey, srcFormKey, tgtFormKey, srcDoc, tgtDoc);
    await afterDoMap(srcForm, tgtForm, tgtFormKey, json, mapWorkitemInfo, postFormula);
};

var afterDoMap = async function (srcForm, tgtForm, tgtFormKey, json, mapWorkitemInfo, postFormula) {

    var show = async function (tgtForm) {

        var document = YIUI.DataUtil.fromJSONDoc(json.document),
            ignoreKeys = json.ignoreKeys,
            gridKeys = json.gridKeys;

        if (ignoreKeys) {
            tgtForm.setSysExpVals("IgnoreKeys", ignoreKeys);
        }

        // tgtForm.regEvent(YIUI.FormEvent.ShowDocument, function(){
        //     if( gridKeys ) {
        //       gridKeys.forEach(function (key) {
        //         var grid = tgtForm.getComponent(key);
        //         grid && grid.getHandler().dealWithSequence(tgtForm,grid,0);
        //       });
        //     }
        // });

        tgtForm.setDocument(document);
        // tgtForm.showDocument();

        if (mapWorkitemInfo) {
            if (srcForm) {
                var info = srcForm.getSysExpVals(YIUI.BPMConstants.WORKITEM_INFO);
                if (info != null) {
                    document.putExpData(YIUI.BPMKeys.SaveBPMMap_KEY, info.WorkitemID);
                    document.expDataType[YIUI.BPMKeys.SaveBPMMap_KEY] = YIUI.ExpandDataType.LONG;
                }
            }
        }

        if (postFormula) {
            var cxt = new View.Context(tgtForm);
            await tgtForm.eval(postFormula, cxt, null);
        }
    }


    const billForm = await BillformStore.createDummyForm(tgtFormKey + "." + json.document.oid, true);
    billForm.form.pFormID = srcForm.formID;
    const ff = billForm.form;
    ff.initViewDataMonitor();
    await show(ff);
    await YIUI.FormParasUtil.processCallParas(srcForm, ff);
    BillformStore.setBillFormStatus(tgtFormKey + "." + json.document.oid, { status: 'ok' });

    HashHistory().push(`card/YES/${tgtFormKey}/${json.document.oid}/NEW/1`);
    AppDispatcher.dispatch({
        type: 'STOPEVENT',
    });
    try {
        await ff.showDocument();
    } finally {
        AppDispatcher.dispatch({
            type: 'ENABLEEVENT',
        });
    }

    // AppDispatcher.dispatch(openClientForm(tgtFormKey, json.document.oid, 'NEW'));
    // data = await YIUI.DocService.loadFormData(billForm, billForm.getOID(), ff.getFilterMap(), ff.getCondParas());

    // if( !tgtForm ) {

    //     var container = srcForm.getContainer();
    //     var builder = new YIUI.YIUIBuilder(tgtFormKey);
    //     builder.setContainer(container);
    //     builder.setParentForm(srcForm);

    //     builder.newEmpty().then(function(emptyForm){

    //         emptyForm.setOptQueue(new YIUI.OptQueue(new YIUI.NewOpt(emptyForm)));

    //         emptyForm.setWillShow(true);

    //         return builder.builder(emptyForm);

    //     }).then(function (form) {

    //         show(form);

    //     });

    // } else {

    //     show(tgtForm);

    // }
};

View.FuncMap.put('Map',
    async function (name, cxt, args) {
        await doMap(name, cxt, args);
    }
);
View.FuncMap.put('MidMap',
    async function (name, cxt, args) {
        await doMap(name, cxt, args);
    }
);
View.FuncMap.put('MapToForm',
    async function (name, cxt, args) {
        var form = cxt.form,
            mapKey = YIUI.TypeConvertor.toString(args[0]),
            srcFormKey = form.formKey,
            tgtForm = form.getParentForm(),
            tgtFormKey = tgtForm.formKey;

        await mapData(form, tgtForm, tgtFormKey, mapKey);
    }
);
View.FuncMap.put('ShowModal',
    async function (name, cxt, args) {
        var pForm = cxt.form, formKey = args[0], tsParas = args[1], callbackList = args[2];
        // formKey = await YIUI.BPMService.getAliasKey(1,formKey);
        var paras = { formKey: formKey }, callBack = {};
        if (callbackList) {
            paras.callbackList = callbackList;
            callBack = splitPara(callbackList);
        }
        if (tsParas) {
            tsParas = splitPara(tsParas);
            for (var key in tsParas) {
                var value = await pForm.eval(tsParas[key], cxt);
                pForm.setCallPara(key, value);
            }
        }

        const billForm = await BillformStore.createDummyForm(formKey + '.-1', true);
        billForm.form.pFormID = pForm.formID;
        const ff = billForm.form;
        await YIUI.FormParasUtil.processCallParas(pForm, ff);

        // data = await YIUI.DocService.loadFormData(billForm, billForm.getOID(), ff.getFilterMap(), ff.getCondParas());

        HashHistory().push(`modal/YES/${formKey}/-1/EDIT`);
        return true;
    }
);


View.FuncMap.put('TakePhoto',
    async function (name, cxt, args) {
        // var form = cxt.form;
        // var formKey = args[0], OID = args[1] || -1;
        // let mobileFormKey = await YIUI.BPMService.getAliasKey(1,formKey);
        try {
            const res = await Util.takePhoto();
            return res;
        } catch (e) {
            throw e;
        } finally {
            console.log('take photo ok')
        }
        /*
        * success: 返回相对路径
        * fail: null
        *
        * */
    }
);
View.FuncMap.put('ShowToast',
    async function (name, cxt, args) {
        const message = args[0];
        const setting = args[1];
        let duration;
        if (setting) {
            duration = setting.duration || 'short';
            duration = duration.toUpperCase();
        }
        try {
            const res = await Util.showToast(message, duration);
            return res;
        } catch (e) {
            throw e;
        }
        /*
        * long: 3.5s
        * short: 2.0s
        * duration: long | short
        *
        * Toast can not be clicked.
        *
        * */
    }
);
export var UIHandler = (function () {
    return {
        /*
         * 同步字典控件的数据
         */
        checkDict: function (options) {
            return new Promise(function (resolve, reject) {
                if (!options.needRebuild && typeof (options.needRebuild) != "undefined") {
                    resolve();
                    return;
                }

                var formID = options.ofFormID;

                var form = YIUI.FormStack.getForm(formID);
                var cxt = { form: form };

                if (options.isDynamic) {
                    options.itemKey = form.eval(options.refKey, cxt, null);
                }

                var rootItem = {};

                if (options.root && options.root.length > 0) {
                    rootItem = form.getComponentValue(options.root);
                    if (rootItem == null) {
                        rootItem = {};
                        rootItem.oid = 0;
                        rootItem.itemKey = options.itemKey;
                    }
                } else {
                    rootItem.oid = 0;
                    rootItem.itemKey = options.itemKey;
                }

                // filter
                var filter = null;
                if (options.itemFilters) {
                    var itemFilter = options.itemFilters[options.itemKey];

                    for (var i in itemFilter) {

                        var cond = itemFilter[i].cond;
                        if (cond && cond.length > 0) {
                            var ret = form.eval(cond, cxt, null);
                            if (ret == true) {
                                filter = itemFilter[i];
                                break;
                            }
                        } else {
                            filter = itemFilter[i];
                            break;
                        }
                    }
                }
                //取 filter的值
                if (filter) {
                    var filterVal
                    var paras = [];
                    for (var j in filter.filterVals) {
                        filterVal = filter.filterVals[j];


                        switch (filterVal.type) {
                            case YIUI.FILTERVALUETYPE.CONST:
                                //paras += content;
                                paras.push(filterVal.refVal);
                                break;
                            case YIUI.FILTERVALUETYPE.FORMULA:
                            case YIUI.FILTERVALUETYPE.FIELD:
                                var cxt = { form: form };
                                //paras += form.eval(content, cxt, null);

                                paras.push(form.eval(filterVal.refVal, cxt, null));
                                break;
                        }
                    }

                    var dictFilter = {};
                    dictFilter.itemKey = options.itemKey;
                    dictFilter.formKey = form.formKey;
                    dictFilter.fieldKey = options.key;
                    dictFilter.filterIndex = filter.filterIndex;
                    dictFilter.values = paras;
                    dictFilter.dependency = filter.dependency;
                    //TODO::
                    //暂时不支持前台传递过滤条件
                    //$this.getDictTree().dictFilter = dictFilter;
                    options.dictFilter = dictFilter;
                }

                var data = {};
                data.itemKey = options.itemKey;
                data.itemData = $.toJSON(rootItem);
                data.service = "PureUIService";
                data.cmd = "CheckDict";

                var success = function (result) {
                    if (result) {
                        resolve(result);
                        options.needRebuild = false;
                    } else {
                        reject('no data');
                    }
                };
                Svr.Request.getAsyncData(Svr.SvrMgr.ServletURL, data, success, reject);
            });
        },
        /**
         * 字典过滤相关
         * */
        getMetaFilter: function (form, fieldKey, itemFilters, itemKey, cxt) {
            var filter = null;
            if (itemFilters) {
                var itemFilter = itemFilters[itemKey] || itemFilters[''];
                if (itemFilter != null && itemFilter != undefined && itemFilter.length > 0) {
                    for (var i = 0, len = itemFilter.length; i < len; i++) {
                        var cond = itemFilter[i].cond;
                        if (cond && cond.length > 0) {
                            if (!cxt) {
                                cxt = new View.Context(form);
                            }
                            var ret = form.eval(cond, cxt, null);
                            if (ret == true) {
                                filter = itemFilter[i];
                                break;
                            }
                        } else {
                            filter = itemFilter[i];
                            break;
                        }
                    }
                }
            }
            return filter;
        },
        /**
         * 查询字典的过滤条件
         */
        getDictFilter: async function (comp, fieldKey, itemFilters, itemKey, cxt) {
            const form = YIUI.FormStack.getForm(comp.ofFormID);
            var filter = this.getMetaFilter(form, fieldKey, itemFilters, itemKey);
            if (filter) {
                var filters = filter.filterVals, filterVal, value, paras = [];
                if (filters !== null && filters.length > 0) {
                    for (var j = 0, len = filters.length; j < len; j++) {
                        filterVal = filters[j];
                        switch (filterVal.type) {
                            case YIUI.FILTERVALUETYPE.CONST:
                                value = filterVal.refVal;
                                break;
                            case YIUI.FILTERVALUETYPE.FORMULA:
                            case YIUI.FILTERVALUETYPE.FIELD:
                                if (!cxt) {
                                    cxt = new View.Context(form);
                                }
                                value = await form.eval(filterVal.refVal, cxt, null);
                                break;
                        }
                        if (filterVal.dataType == YIUI.DataType.DATE ||
                            filterVal.dataType == YIUI.DataType.DATETIME) {
                            if (value instanceof Date) {
                                value = value.getTime();
                            }
                        }
                        paras.push(value);
                    }
                }
                var dictFilter = {};
                dictFilter.itemKey = itemKey;
                dictFilter.formKey = form.formKey;
                dictFilter.fieldKey = fieldKey;
                dictFilter.filterIndex = filter.filterIndex;
                dictFilter.values = paras;
                dictFilter.dependency = filter.dependency;
                dictFilter.typeDefKey = filter.typeDefKey;
                return dictFilter;
            }
            return null;
        },
        /*
         * dictItem: {
         * 	itemKey:
         * 	oid:
         * 	caption:
         * }
         */
        getDictChildren: function (itemKey, dictItem, dictFilter) {
            return new Promise(function (resolve, reject) {
                try {
                    YIUI.DictService.getDictChildren(itemKey, dictItem, dictFilter, true, resolve, reject);
                } catch (ex) {
                    reject(ex);
                }
            });
        },
        /**
         * 模糊查询　用于dictQueryPane 与　链式字典的dictView
         */
        getQueryData: async function (itemKey, startRow, maxRows, fuzzyValue, stateMask, filter, root) {
            // return new Promise(function (resolve, reject) {
            var result = true;
            var data = {};
            data.itemKey = itemKey;
            data.startRow = startRow;
            data.maxRows = maxRows;
            data.pageIndicatorCount = 3;
            data.value = fuzzyValue;
            data.stateMask = stateMask;
            // data.onlyEnable = onlyEnable;
            if (filter != null) {
                data.filter = $.toJSON(filter);
            }
            if (root != null) {
                data.root = $.toJSON(root);
            }
            data.service = "WebDictService";
            data.cmd = "GetQueryData";

            // var success = function (result) {
            //     if (result) {
            //         resolve(result);
            //     } else {
            //         reject('no data');
            //     }
            // };

            return await Svr.Request.getAsyncData(Svr.SvrMgr.ServletURL, data);
            // })
        },
        /**
         * 直接输入文本时智能提示相关数据
         */
        getSuggestData: async function (itemKey, suggestValue, statMask, filter, root) {
            var data = {};
            data.itemKey = itemKey;
            data.value = suggestValue;
            data.statMask = statMask;
            if (filter != null) {
                data.filter = $.toJSON(filter);
            }
            if (root != null) {
                data.root = $.toJSON(root);
            }
            data.service = "WebDictService";
            data.cmd = "GetSuggestData";
            return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data);
        },
        getItem: function (itemKey, oid, onlyEnable) {
            return new Promise(function (resolve, reject) {
                var data = {};
                data.itemKey = itemKey;
                data.oid = oid;
                data.onlyEnable = onlyEnable;
                data.cmd = "GetItem";
                data.service = "WebDictService";

                var result = true;
                var success = function (msg) {
                    var item = null;
                    if (msg) {
                        item = YIUI.DataUtil.fromJSONItem(msg);
                    }
                    resolve(item);
                };

                Svr.Request.getAsyncData(Svr.SvrMgr.ServletURL, data, success, reject);
            })
        },
        getEmptyDocument: function (formKey) {
            return new Promise(function (resolve, reject) {
                var paras = {};
                paras.service = "PureOpt";
                paras.cmd = "GetNewDocument";
                paras.formKey = formKey;
                paras.type = YIUI.OptScript.LOAD;
                Svr.Request.getAsyncData(Svr.SvrMgr.ServletURL, paras, resolve, reject);
            })
        },
        getComboboxItems: function (combobox) {
            return new Promise(function (resolve, reject) {
                if (!combobox.needRebuild && typeof (combobox.needRebuild) != "undefined") {
                    resolve(combobox.items);
                    return;
                }
                var items = [];
                var sourceType = combobox.sourceType,
                    formID = combobox.ofFormID;
                switch (sourceType) {
                    case 3:
                    case 4:
                    case YIUI.COMBOBOX_SOURCETYPE.ITEMS:
                        resolve(combobox.items);
                        break;
                    case YIUI.COMBOBOX_SOURCETYPE.FORMULA:
                        var form = YIUI.FormStack.getForm(formID);
                        var cxt = { form: form };
                        items = form.eval($.trim(combobox.formula), cxt, null);
                        resolve(items);
                        break;
                    case YIUI.COMBOBOX_SOURCETYPE.QUERY:
                        var form = YIUI.FormStack.getForm(formID);
                        var data = {}, type;
                        var queryParas = combobox.queryParas;

                        data.formID = formID;
                        data.key = combobox.key;
                        data.formKey = form.getFormKey();
                        data.fieldKey = combobox.key;

                        data.service = "PureUIService";
                        data.cmd = "getQueryItems";

                        var sourceType, value, paras = [];
                        for (var i = 0, len = queryParas.length; i < len; i++) {
                            sourceType = queryParas[i].sourceType;
                            value = queryParas[i].value;
                            //if(i > 0 && i < len - 1) paras += ",";
                            switch (sourceType) {
                                case YIUI.COMBOBOX_PARAMETERSOURCETYPE.CONST:
                                    //paras += content;
                                    paras.push(value);
                                    break;
                                case YIUI.COMBOBOX_PARAMETERSOURCETYPE.FORMULA:
                                case YIUI.COMBOBOX_PARAMETERSOURCETYPE.FIELD:
                                    var cxt = { form: form };
                                    //paras += form.eval(content, cxt, null);

                                    paras.push(form.eval(value, cxt, null));
                                    break;
                            }
                        }
                        data.paras = $.toJSON(paras);

                        Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data, resolve, reject);
                        break;
                    default:
                        reject(`sourceType=${sourceType} not support!`);
                        break;
                }
            });
        }
    }
})();
// YIUI.UIUtil = (function(){
//     return {
// 		showDatePicker:function(control){
// 		},
// 		showDictPicker:function(control){
// 		},
// 		showComboPicker:function(control){
// 		}
//     }
// })();
export var UIOptCenter = (function () {
    return {
        checkLogin: function () {
            var paras = {
                url: Svr.SvrMgr.ServletURL,
                clientID: document.clientID,
                service: Svr.SvrMgr.Service.LoadTreeMenu
            };
            return UIOptCenter.awaitDoCmd(paras);
            // return new Promise(function(resolve,reject){
            // 	var paras = {
            // 		url: Svr.SvrMgr.ServletURL,
            // 		clientID: document.clientID,
            // 		service: Svr.SvrMgr.Service.LoadTreeMenu
            // 	};
            // 	return UIOptCenter.doCmd(paras,resolve,reject);
            // });
        },
        doCmd: function (paras, success, error) {    //静态私有方法
            return awaitDoCmd(paras, success, error);
            // var returnObj = Svr.Request.getAsyncData(paras.url, paras, success, error);
            // return returnObj;
        },
        awaitDoCmd: function (paras, success, error) {
            return new Promise(function (resolve, reject) {
                Svr.Request.getAsyncData(paras.url, paras, resolve, reject);
            });
        },
        doEntry: async function (entry, formKey, parameters, container) {
            var paras = {};
            paras.nodeKey = entry;
            paras.eventType = Svr.SvrMgr.EventType.Click;
            paras.formKey = formKey;
            paras.treeParas = parameters;
            try {
                var jsonObj = await Svr.SvrMgr.doPureTreeEvent(paras);
                var form = new YESBillFormWrap(YIUI.FormBuilder.build(jsonObj));
                AppDispatcher.dispatch({
                    type: 'RECEIVEFORMDATA',
                    data: form,
                    formKey: formKey,
                    id: form.form.OID
                });
            } catch (ex) {
                Util.processError(ex);
            }
        },
        openBill: function (formKey, OID) {
            var form = YIUI.FormStack.getForm(formId);
            var params = { formKey: formKey, oid: OID.toString(), cmd: "PureOpenForm" };
            var success = function (jsonObj) {
                var newForm = YIUI.FormBuilder.build(jsonObj, target, form.formID);
                if (target == YIUI.FormTarget.SELF) {
                    YIUI.UIUtil.replaceForm(form, newForm, cxt);
                    return;
                }
                if (target != YIUI.FormTarget.MODAL) {
                    container.build(newForm);
                }
                newForm.setOperationState(YIUI.Form_OperationState.Default);
                newForm.pFormID = form.formID;
            };
            Svr.SvrMgr.dealWithPureForm(params, success);
        },
        doOpt: function (formId, optKey) {
            var opt = UIOptCenter.findOpt(formId, optKey);
            if (opt) {
                var options = {
                    ofFormID: formId,
                    clickContent: opt.action
                }
                YIUI.ToolBarHandler.doOnClick(options);
            }
        },
        findOpt: function (formId, optKey) {
            var form = YIUI.FormStack.getForm(formId);
            var toolbar = _.find(form.compList, function (item) {
                return item.tagName == 'toolbar';
            });
            if (toolbar) {
                return _.find(toolbar.items, function (item) {
                    return item.key == optKey;
                });
            }
            return null;
        }
    }
})();

/**
 * 这里开始改造yes所有的客户端控件的行为，去掉所有和界面显示相关的代码
 * 将yes ui改变为仅仅包含数据以及和parser进行交互的中介，而不再进行界面渲染
 * 界面渲染部分将在不同的环境下由不同的框架进行处理
 */

Object.assign(YIUI.Form.prototype, {
    /**
     * 之前的fireClose将弹出一个提示的Dialog，取消
     * @return
     */
    fireClose: empty.func,
    initFirstFocus: empty.func
})

/*Object.assign(YIUI.Handler, {
    checkAndSet: function (control, value) {
        if (value instanceof Decimal) {
            value = value.toString();
        }
        if (control.value == value) {
            return false;
        }
        control.value = value;
        return true;
    }
});*/


// YIUI.OldUICheckOpt = YIUI.UICheckOpt;

// YIUI.UICheckOpt = function (form) {
//     var result = new YIUI.OldUICheckOpt(form);
//     result.showError = function (msg, type) {
//         //Util.alert(msg);
//         if (type == YIUI.Dialog_Type.WARN) {
//             AppDispatcher.dispatch(Warn(msg));
//             return;
//         }
//         AppDispatcher.dispatch(Error(msg));
//     }
//     return result;
// }

// YIUI.ExprUtil.getImplValue = function (form, key, cxt) {
//     var comp = form.getComponent(key), clt = form.getCellLocation(key), value = form.getComponentValue(key, cxt);
//     if (comp && comp.type == YIUI.CONTROLTYPE.DICT && value !== null && value !== undefined) {
//         value = (typeof value == "object") ? value.oid : JSON.parse(value).oid;
//     }
//     if (clt) {
//         comp = form.getComponent(clt.key);
//         if (comp.type == YIUI.CONTROLTYPE.GRID) {
//             var ri = cxt.rowIndex == undefined ? comp.getFocusRowIndex() : cxt.rowIndex;
//             var rowData = comp.getRowDataAt(ri);
//             if (rowData) {
//                 var cellKey = rowData.cellKeys[clt.column],
//                     editOpt = comp.getCellEditor(cellKey).toJSON();
//                 if (editOpt && editOpt.edittype == "dict" && value !== null && value !== undefined) {
//                     value = (typeof value == "object") ? value.oid : JSON.parse(value).oid;
//                 }
//             }
//         }
//     }
//     return value;
// }
//
// YIUI.ShowData = function (form) {
//     var Return = {
//         resetDocument: function () {
//             var document = form.getDocument();
//             if (document == null) {
//                 return;
//             }
//             var table = null;
//             for (var i = 0, len = document.tbls.length; i < len; i++) {
//                 table = document.tbls[i];
//                 table.first();
//             }
//         },
//         loadHeader: function (cmp) {
//             var document = form.getDocument();
//             var tableKey = cmp.getMetaObj().tableKey;
//             var table = tableKey && document.getByKey(tableKey);
//             if (!table) {
//                 return;
//             }
//             var columnKey = cmp.getMetaObj().columnKey, value = "";
//             if (table.getRowCount() > 0) {
//                 value = table.getByKey(columnKey);
//                 if (cmp.type == YIUI.CONTROLTYPE.DYNAMICDICT) {
//                     var itemKey = table.getByKey(columnKey + "ItemKey");
//                     cmp.itemKey = itemKey;
//                 }
//             }
//             cmp.setValue(value);
//         },
//         loadListView: function (listView) {
//             var showLV = new YIUI.ShowListView(form, listView);
//             showLV.load();
//         },
//         loadGrid: function (grid) {
//             var showGrid = YIUI.ShowGridData(form, grid);
//             showGrid.load();
//         },
//         loadTableViewList: function (listView) {
//             var document = form.getDocument();
//             var tableKey = listView.getMetaObj().tableKey || 'ProductInfo';
//             if (!tableKey) return;
//             var table = document.getByKey(tableKey);
//             if (!table) return;
//             listView.totalRowCount = table.allRows.length;
//             var rows = [], row, col, colKey;
//             for (var j = 0, length = table.getRowCount(); j < length; j++) {
//                 row = {};
//                 table.setPos(j);
//                 table.cols.forEach((item, index) => {
//                     row[item.key] = {
//                         value: table.get(index),
//                         displayValue: null
//                     }
//                 })
//                 rows.push(row);
//             }
//             listView.resetData(rows);
//         },
//         show: function () {
//             this.resetDocument();
//             AppDispatcher.dispatch(StopEvent());
//             try {
//                 var cmpList = form.getComponentList(), cmp;
//                 for (var i in cmpList) {
//                     cmp = cmpList[i];
//                     if (cmp.getMetaObj().isSubDetail) continue;
//                     if (cmp instanceof YIUI.TableViewList) {
//                         this.loadTableViewList(cmp);
//                         continue;
//                     }
//                     if (cmp instanceof YIUI.ListView) {
//                         this.loadListView(cmp);
//                         continue;
//                     }
//                     if (cmp instanceof YIUI.Grid) {
//                         cmp.rootGroupBkmk = null;
//                         this.loadGrid(cmp);
//                         continue;
//                     }
//                     if (cmp.needClean() && !cmp.condition) {
//                         cmp.setValue(null, false, false);
//                     }
//                     this.loadHeader(cmp);
//                 }
//                 this.postShowData();
//             } finally {
//                 AppDispatcher.dispatch(EnableEvent());
//             }
//         },
//         postShowData: function () {
//             form.getUIProcess().doPostShowData();
//             form.getUIProcess().calcToolBar();
//             form.initFirstFocus();
//         }
//     };
//     return Return;
// };
//
// YIUI.ShowListView = function (form, listView) {
//     var Return = {
//         load: function () {
//             listView.clearAllRows();
//             var document = form.getDocument();
//             var tableKey = listView.getMetaObj().tableKey;
//             if (!tableKey) return;
//             var table = document.getByKey(tableKey);
//             if (!table) return;
//             listView.totalRowCount = table.allRows.length;
//             var rows = [], row, col, colKey;
//             var columnInfo = listView.metaObj.columnInfo || listView.columnInfo;
//             for (var j = 0, length = table.getRowCount(); j < length; j++) {
//                 row = {};
//                 table.setPos(j);
//                 for (var m = 0, length3 = columnInfo.length; m < length3; m++) {
//                     var column = columnInfo[m];
//                     var key = column.key;
//                     row[key] = {};
//
//                     var colKey = columnInfo[m].columnKey;
//                     //row[colKey].caption;
//                     if (colKey) {
//                         var caption = "", value = table.getByKey(colKey);
//                         switch (column.columnType) {
//                             case YIUI.CONTROLTYPE.DATEPICKER:
//                                 if (value) {
//                                     // var date = new Date(parseInt(value));
//                                     // var format = "yyyy-MM-dd";
//                                     // if (!column.onlyDate) {
//                                     //     format = "yyyy-MM-dd HH:mm:ss";
//                                     // }
//                                     // caption = date.Format(format);
//                                     // value = date.toString();
//                                 }
//                                 break;
//                             case YIUI.CONTROLTYPE.DICT:
//                                 var itemKey = column.itemKey;
//                                 var oid = YIUI.TypeConvertor.toInt(value);
//                                 caption = null;// YIUI.DictService.getCaption(itemKey, oid);
//                                 break;
//                             case YIUI.CONTROLTYPE.COMBOBOX:
//                                 var items = column.items;
//                                 for (var i = 0, len = items.length, item; i < len; i++) {
//                                     var item = items[i];
//                                     if (item.value == value) {
//                                         caption = item.caption;
//                                         break;
//                                     }
//                                 }
//                                 break;
//                             case YIUI.CONTROLTYPE.NUMBEREDITOR:
//                                 var decScale = column.decScale;
//                                 var roundingMode = column.roundingMode;
//                                 var d = null;
//                                 if (value) {
//                                     d = YIUI.TypeConvertor.toDecimal(value);
//                                     caption = d.toFixed(decScale, roundingMode);
//                                 }
//                                 break;
//                             case YIUI.CONTROLTYPE.IMAGE:
//                                 caption = `${Svr.SvrMgr.AttachURL}?path=${value}&formKey=${form.formKey}&service=DownloadImage&mode=1`;
//                                 break;
//                             default:
//                                 caption = table.getByKey(colKey);
//                                 break;
//                         }
//                         row[key].caption = caption;
//
//                         row[key].value = value;
//
//                     } else {
//
//                         row[key].caption = column.caption;
//
//                         row[key].value = column.caption;
//
//                     }
//
//                 }
//
//                 rows.push(row);
//
//             }
//
//             if (!listView.getMetaObj().pageRowCount || listView.totalRowCount < listView.getMetaObj().pageRowCount) {
//
//                 listView._pagination.hidePagination();
//
//             } else if (listView.totalRowCount) {
//
//                 listView._pagination.setTotalRowCount(listView.totalRowCount, true);
//
//             }
//
//             listView.resetData(rows);
//
//             // listView.addDataRow(rows);
//
//             // listView.addEmptyRow();
//
//         }
//
//     };
//
//     return Return;
//
// };
//
// YIUI.ShowGridData = function (form, grid) {
//
//     var Return = {
//
//         dealGridGroupRow: function () {
//
//
//
//
//
//         },
//
//
//
//         load: function () {
//
//
//
//             grid.clearGridData();
//
//
//
//             var document = form.getDocument();
//
//
//
//             var tableKey = grid.tableKey || grid.metaObj.tableKey;
//
//
//
//             if (tableKey) {
//
//
//
//                 var table = document.getByKey(tableKey), beginIndex = 0, endIndex = table.getRowCount(), newRd,
//
//
//
//                     rootGroupBkmkArray = grid.rootGroupBkmk;
//
//
//
//                 if (rootGroupBkmkArray == null || rootGroupBkmkArray.length == 0) {
//
//
//
//                     rootGroupBkmkArray = [];
//
//
//
//                     table.beforeFirst();
//
//
//
//                     while (table.next()) {
//
//
//
//                         if (table.rows[table.pos].state != DataDef.R_Deleted) {
//
//
//
//                             rootGroupBkmkArray.push(table.getBkmk());
//
//
//
//                         }
//
//
//
//                     }
//
//
//
//                     grid.rootGroupBkmk = rootGroupBkmkArray;
//
//
//
//                 }
//
//
//
//                 grid.initEmptyData(rootGroupBkmkArray.length);//初始化空数据
//
//
//
//             }
//
//
//
//         }
//
//
//
//     };
//     return Return;
// };
