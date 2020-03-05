/*
 * @Author: gmf
 * @Date:   2016-11-22 10:33:46
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-21 09:18:07
 */

import memoryAdapter from './memoryAdapter';
import Cache from './cache';
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';
import '../services';
import getDispatcher from '../dispatchers';

let adapter = memoryAdapter;
let dispatchToken = null;
const cacheSystem = {
    current: {
        FormCache: null,
        FormDataCache: null,
        DictCache: null,
    },
    injectCache(cacheAdapter) {
        if (cacheAdapter) {
            adapter = cacheAdapter;
        }
        if (dispatchToken) {
            getDispatcher().unregister(dispatchToken);
        }
        dispatchToken = getDispatcher().register((action) => {
            switch (action.type) {
                case 'CHANGEUSER':
                    onChangeUser(action.userinfo);
                    break;
                default:
            }
        });
        cacheSystem.current.FormCache = new Cache(adapter, 'form', async function (table, formKey) {
            const result = await YIUI.MetaService.getMetaForm(formKey);// TODO
            // result.key = formKey;
            return {
                data: result,
                key: formKey,
            };
        });
        cacheSystem.current.Setting = new Cache(adapter, 'setting');
        cacheSystem.current.FormRightCache = new Cache(adapter, 'formright', async function (table, formKey) {
            return {
                key: formKey,
                data: {
                    formKey, allVisibleRights: true, allOptRights: true, allEnableRights: true,
                },
            };
        });
        cacheSystem.current.FormDataCache = new Cache(
            adapter, 'formdata', async function (table, key, ff) {
                const [formKey, oid] = key.split('.');
                // const form = await cacheSystem.current.FormCache.get(formKey);
                // const ff = YIUI.FormBuilder.build(form);
                // const rights = await cacheSystem.current.FormRightCache.get(formKey);
                // ff.setFormRights(rights);
                // ff.initViewDataMonitor();
                let result = null;
                try {
                    if (oid === 'new') {
                        if (ff.onLoad) {
                            result = await YIUI.DocService.loadFormData(ff, -1, ff.getFilterMap(), ff.getCondParas());
                        } else {
                            result = await YIUI.DocService.newDocument(formKey);
                        }
                    } else if (oid === 'modal') {
                        result = await YIUI.DocService.loadFormData(ff, ff.getOID(), ff.getFilterMap(), ff.getCondParas());
                    } else {
                        // try {
                        result = await YIUI.DocService.loadFormData(ff, oid, ff.getFilterMap(), ff.getCondParas());
                        // } catch (ignore) { }
                    }
                } finally {
                    // YIUI.FormStack.removeForm(ff.formID);
                }
                // const result = await Svr.SvrMgr.dealMobileLoadFormData(ff, oid); //TODO
                // const data = YIUI.DataUtil.fromJSONDoc(result.document);
                return {
                    data: result,
                    key,
                };
            }, false);
        cacheSystem.current.DictCache = new Cache(adapter, 'dict', async function (table, key) {
            const tmp = key.split('.');
            const [itemKey, id] = tmp;
            const data = {};
            data.itemKey = itemKey;
            data.oid = id;
            data.statMask = false;
            data.cmd = "GetItem";
            data.service = "WebDictService";
            const result = await Svr.Request.getData(data);
            // const result = await YIUI.DictService.getItem(itemKey, id, false);
            return {
                data: result,
                key,
            };
        });
    },
};

const onChangeUser = async function (userinfo) {
    let currentUserId = await cacheSystem.current.Setting.get('currentUserId');
    userinfo = userinfo || {};
    if (userinfo.id !== currentUserId) {
        // 需要清理缓存数据，主要是form相关的所有数据
        cacheSystem.current.FormCache && cacheSystem.current.FormCache.clear();
        cacheSystem.current.FormDataCache && cacheSystem.current.FormDataCache.clear();
        cacheSystem.current.FormRightCache && cacheSystem.current.FormRightCache.clear();
        cacheSystem.current.Setting.put('currentUserId', {
            key: 'currentUserId',
            data: userinfo.id,
        });
    }
};

cacheSystem.injectCache(memoryAdapter);
export default cacheSystem;
