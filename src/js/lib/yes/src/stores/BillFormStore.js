/*
 * @Author: gmf
 * @Date:   2016-03-14 10:39:18
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-01-25 14:53:05
 */

import { Store } from 'flux/utils';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { cacheSystem } from 'yes-core';
import InteractionManager from '../InteractionManager';
import { YIUI } from '../yes';
import Util from '../util';
import YESBillFormWrap from '../components/YESBillFormWrap';
import { EnableEvent as enableEvent } from '../actions/AppStatusAction';
/**
 * 这个store用于存放当前系统中已经从后来获取过的所有单据，
 * YESBillForm这个控件将直接从这里抓取数据，进行渲染数据的存放形式将分两层
 * bill->id
 * 最终的单据数据还是保存在YIUI.Form这个对象中(完全修改数据的保存方式改动量太大)
 *
 */
var dataBill = new Map();
var billStatus = new Map();
class YESFormStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);
        this.stopEvent = 0;
        // this.debounceEmitChange = throttle(this.__emitChange, 300, { leading: true });
    }

    onReceiveFormData(action) {
        dataBill[action.formKey] = action.data;
        this.onSuccessRequestForm(action);
    }

    onStartRequestForm(action) {
        billStatus[action.formKey] = {
            status: action.reloading ? 'reloading' : 'fetching',
        };
    }

    onFailRequestForm(action) {
        var err = action.error;
        if (err.success === null) { // 意外错误
            err = {
                error_code: 0,
                error_info: err.message,
            };
        }
        billStatus[action.formKey] = {
            status: 'error',
            error: err,
        };
    }

    onSuccessRequestForm(action) {
        billStatus[action.formKey] = {
            status: 'ok',
        };
    }

    enableEvent() {
        this.stopEvent -= 1;
    }

    stopEvent() {
        this.stopEvent += 1;
    }

    getBillFormStatus(key) {
        let result = billStatus[key];
        if (!result) {
            result = {
                status: 'not exist',
            };
            billStatus[key] = result;
        } else {
            result.formStatus = dataBill[key] && dataBill[key].form.getOperationState();
        }
        // result.stopEvent = this.stopEvent;
        return result;
    }

    setBillFormStatus(key, status) {
        billStatus[key] = status;
    }

    async reloadFormData(key, document) {
        if (this.getBillFormStatus(key).status === 'reloading' ||
            this.getBillFormStatus(key).status === 'fetching') {
            return;
        }
        AppDispatcher.dispatch({
            type: 'STARTREQUESTFORM',
            formKey: key,
            reloading: true,
        });
        try {
            this.stopEvent += 1;
            const [formKey, oid] = key.split('.');
            let f = this.getBillForm(key);
            if (!f) {
                return;
            }
            const ff = f.form;
            ff.initViewDataMonitor();
            const data = document;
            // if (!data) {
            //     data = await cacheSystem.current.FormDataCache.get(key, true, ff);
            //     // data = await YIUI.DocService.loadFormData(ff, oid, ff.getFilterMap(), ff.getCondParas());
            // }
            // else {
            //     cacheSystem.current.FormDataCache.put(key, {
            //         key,
            //         data,
            //     });
            // }
            if (data) {
                const doc = YIUI.DataUtil.fromJSONDoc(data);
                // const rights = { formKey, allVisibleRights: true, allOptRights: true, allEnableRights: true };
                // ff.setFormRights(rights);
                ff.setDocument(doc);
            }
            // ff.initViewDataMonitor();
            f = f || new YESBillFormWrap(ff);
            // appdispatcher.dispatch({
            //     type: 'receiveformdata',
            //     data: f,
            //     formkey: key,
            // });
            InteractionManager.runAfterInteractions(
                async () => {
                    console.time('reloadform');
                    this.stopEvent += 1; // StopEvent
                    try {
                        ff.clearFormulaCache();
                        if (!data) {
                            await ff.doOnLoad();
                        }
                        await ff.showDocument();
                        console.timeEnd('reloadform');
                        AppDispatcher.dispatch({
                            type: 'RECEIVEFORMDATA',
                            data: f,
                            formKey: key,
                        });
                    } finally {
                        AppDispatcher.dispatch(enableEvent());
                    }
                });
            return;
        } catch (ex) {
            AppDispatcher.dispatch({
                type: 'FAILREQUESTFORM',
                formKey: key,
                error: ex,
            });
        } finally {
            // this.stopEvent--;
            AppDispatcher.dispatch(enableEvent());
        }
    }

    async createDummyForm(key, force = false, formID) {
        if (dataBill[key]) {
            if (force) {
                this.removeForm(key);
            } else {
                return dataBill[key];
            }
        }
        const [formKey, oid] = key.split('.');
        const form = await cacheSystem.current.FormCache.get(formKey);
        const ff = YIUI.FormBuilder.build(form, formID);
        ff.setUniqueId(key);
        ff.setOID(oid);
        const f = new YESBillFormWrap(ff);
        dataBill[key] = f;
        return f;
    }

    async fetchForm(key, status, expVals, paras, parent, formID) {
        if (this.getBillFormStatus(key).status === 'fetching') {
            return null;
        }
        AppDispatcher.dispatch({
            type: 'STARTREQUESTFORM',
            formKey: key,
        });
        try {
            this.stopEvent += 1; // StopEvent
            const [formKey, oid] = key.split('.');
            const form = await cacheSystem.current.FormCache.get(formKey);
            // form.operationState = 2 || form.initOperationState;
            form.operationState = status === null ? 0 : status;// default状态，所有获取的单据数据忽略其中的operationState属性，都使用默认的0
            form.initState = form.operationState;
            const ff = YIUI.FormBuilder.build(form, null, parent, formID);
            console.log(ff)
            if (parent) {
                ff.pFormID = parent;
                const pForm = YIUI.FormStack.getForm(parent, formID);
                if (pForm) {
                    YIUI.FormParasUtil.processCallParas(pForm, ff);
                }
            }
            ff.initViewDataMonitor();
            if (expVals) {
                ff.sysExpVals = expVals;
            }

            // const data = await cacheSystem.current.FormDataCache.get(key, false, ff);
            // ff.dictCaption = data.dictCaption;
            // const doc = YIUI.DataUtil.fromJSONDoc(data);
            // const rights = { formKey, allVisibleRights: true, allOptRights: true, allEnableRights: true };
            // ff.setFormRights(rights);
            // ff.initViewDataMonitor();
            let newKey = key;
            // if (oid === 'new' && doc) { // 如果是新增的单据这里需要申请oid
            //     const newOid = await YIUI.RemoteService.applyNewOID();
            //     doc.oid = newOid;
            //     newKey = `${formKey}.${newOid}`;
            // }
            // ff.setDocument(doc);
            ff.setUniqueId(newKey);
            ff.setOID(oid);
            // await waitToTransitionEnd();
            const f = new YESBillFormWrap(ff);
            // AppDispatcher.dispatch({
            //     type: 'RECEIVEFORMDATA',
            //     data: f,
            //     formKey: newKey,
            // });
            InteractionManager.runAfterInteractions(
                async () => {
                    console.time('fetchform');
                    this.stopEvent += 1; // StopEvent
                    try {
                        // await ff.doOnLoad();
                        await ff.doOnLoad();
                        // await ff.showDocument();
                        console.timeEnd('fetchform');
                        AppDispatcher.dispatch({
                            type: 'RECEIVEFORMDATA',
                            data: f,
                            formKey: newKey,
                        });
                    } catch (ex) {
                        AppDispatcher.dispatch({
                            type: 'FAILREQUESTFORM',
                            formKey: key,
                            error: ex,
                        });
                    } finally {
                        AppDispatcher.dispatch(enableEvent());
                    }
                });
            return f;
        } catch (ex) {
            console.log(ex);
            AppDispatcher.dispatch({
                type: 'FAILREQUESTFORM',
                formKey: key,
                error: ex,
            });
            Util.processError(ex);
        } finally {
            // this.stopEvent--;
            AppDispatcher.dispatch(enableEvent());
        }
        return null;
    }

    clear() {
        dataBill = new Map();
        billStatus = new Map();
    }

    getBillForm(key, status) {
        const billForm = dataBill[key];
        // 当Store中没有找到对应的单据对象的时候需要启动一个线程去抓取表单的数据
        // if(!billForm){
        //     setTimeout(async ()=>{
        //         await this.fetchForm(key)
        //     },0);
        // }
        return billForm;
    }

    removeForm(key) {
        const billform = dataBill[key];
        if (billform) {
            billform.form.destroy();
            YIUI.FormStack.removeForm(billform.form.formID);
            delete dataBill[key];
        }
    }

    addForm(key, form) {
        this.removeForm(key);
        form.setUniqueId(key);
        const f = new YESBillFormWrap(form);
        dataBill[key] = f;
    }

    ___emitChange() {
        if (this.stopEvent !== 0) {
            return;
        }
        // this.debounceEmitChange();
        this.__emitChange();
    }

    __onDispatch(action) {
        // console.log(`GET ${action.type}`);
        switch (action.type) {
            case 'RECEIVEFORMDATA':
                this.onReceiveFormData(action);
                this.___emitChange();
                break;
            case 'STARTREQUESTFORM':
                this.onStartRequestForm(action);
                this.___emitChange();
                break;
            case 'FAILREQUESTFORM':
                this.onFailRequestForm(action);
                this.___emitChange();
                break;
            case 'STOPEVENT':
                // case 'TRANSITIONSTART':
                this.stopEvent++;
                this.___emitChange();
                break;
            case 'RELOADFORM':
                setTimeout(() => {
                    this.reloadFormData(action.key, action.document);
                }, 0);
                break;
            case 'ENABLEEVENT':
                // case 'TRANSITIONEND':
                this.stopEvent--;
                this.___emitChange();
                break;
            case 'CHANGED':
                this.___emitChange();
                break;
            case 'CHANGEUSER':
                this.clear();
                this.__emitChange();
                break;
        }
    }
}
const store = new YESFormStore(AppDispatcher);
window.FormStore = store;
// export default new YESFormStore(AppDispatcher);
export default store;
