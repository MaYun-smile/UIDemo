/*
 * @Author: gmf
 * @Date:   2016-03-18 10:42:31
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-07 11:28:01
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import { DataDef } from '../../YIUI-common';
import Svr from '../../YIUI-svr';
import { View } from '../../YIUI-parser';
import { regControlType } from './controlUtil';
import { lodash as $ } from 'yes-common';
import Immutable from 'immutable';
import objecthash from 'object-hash';

const synchronized = function (fn, scope) {
    let promise = null;
    return function () {
        if (promise) {
            return promise;
        }
        promise = fn.apply(scope, arguments);
        if (promise.then) {
            promise.then(() => {
                promise = null;
            });
        } else {
            let tmp = promise;
            promise = null;
            return Promise.resolve(tmp);
        }
        return promise;
    }
}

const ComboboxEditor = YIUI.extend(BaseControl, {
    needRebuild: true,
    /**
     * 下拉框数据
     */
    items: null,
    /**
     * 是否多选
     * @type Boolean
     */
    multiselect: false,
    hasText: false,
    sourceType: YIUI.COMBOBOX_SOURCETYPE.ITEMS,
    dependentKey: null,
    /**
     * 是否可编辑
     * @type Boolean
     */
    editable: true,
    // handler: YIUI.ComboBoxHandler,
    init(options) {
        this.base(options);
        const items = this.items || this.getMetaObj().items;
        this.items = items;
        this.getMetaObj().multiSelect = this.type === YIUI.CONTROLTYPE.CHECKLISTBOX;
        this.state = this.state.set('items', Immutable.fromJS(items || []));
        this.itemCache = {};
        this.resetItems = synchronized(this.resetItemsInner, this);
    },
    async calculateDisplayValue(v, cxt) {
        try {
            v = v + '';
            await this.resetItems(false, cxt);
            let items = [v];
            if (this.getMetaObj().multiSelect) {
                items = v.split(',');
            }
            const captions = items.map((value) => {
                const tmp = this.state.get('items').find((item) => ('' + item.get('value')) === value);
                return tmp ? tmp.get('caption') : '';
            });
            return captions.join(', ');
        } catch (ex) {
            return '出错';
        }
    },
    async setInnerValue(v) {
        BaseControl.prototype.setInnerValue.apply(this, [v]);
        if (v !== this.getState().get('value') && v) {
            await this.resetItems();
        }
    },
    dependedValueChange(srcField, targetField, v) {
        this.needRebuild = true;
        //增加: 点击后,后面值清空
        const state = this.state.set('value', v);
        this.changeState(state);
    },
    async resetItemsInner(force = false, cxt) {
        console.log('combobox resetItems');
        const items = await this.getComboboxItems(force, cxt);
        // this.items = this.clearData(items);
        if (this.items !== items) {
            const state = this.state.setIn(['items'], Immutable.fromJS(items));
            this.items = items;
            this.changeState(state);
        }
    },
    clearData(data) {
        const keys = [];
        const result = [];
        data.forEach((item) => {
            if (!keys.includes(item.value)) {
                result.push(item);
                keys.push(item.value);
            }
        });
        return result;
    },
    async getFormulaItems(form, meta, cxt) {
        let items = [];
        if (meta.formula) {
            // const f = '((OA_GetDropItemByBPM()+"xxxx")+OA_GetDropItemByBPM())+"yyyy"';
            // console.log(meta.formula);
            const rs = await form.evalFormula($.trim(meta.formula), cxt, null);
            // var rs = await form.eval(f,cxt,null);
            if ($.isString(rs)) {
                const item_Arr = rs.split(';');
                for (let i = 0, len = item_Arr.length; i < len; i++) {
                    const item_obj = item_Arr[i].split(',');
                    const i1 = item_obj[0];
                    let i2 = '';
                    if (item_obj.length > 1) {
                        i2 = item_obj[1];
                    } else {
                        i2 = i1;
                    }
                    const item = {
                        value: i1,
                        caption: i2,
                    };
                    items.push(item);
                }
            } else if (rs instanceof DataDef.DataTable) {
                rs.beforeFirst();
                if (rs.cols.length == 1) { // 如果查询的是一列,那么认为是查询了value,caption从全局中匹配
                    var globalItems = meta.globalItems;
                    var pItems = await form.evalFormula($.trim(globalItems), cxt, null);
                    while (pItems.next()) {
                        var value = YIUI.TypeConvertor.toString(pItems.get(0));
                        var caption = YIUI.TypeConvertor.toString(pItems.get(1));
                        if (pItems && pItems.length > 0) {
                            for (var i = 0, len = pItems.length; i < len; i++) {
                                var pItem = pItems[i];
                                if (pItem.value == value) {
                                    caption = pItem.caption;
                                    break;
                                }
                            }
                        }
                        caption = caption == '' ? value : caption;
                        var item = {
                            value,
                            caption,
                        };
                        items.push(item);
                    }
                } else if (rs.cols.length > 1) {
                    while (rs.next()) {
                        var value = YIUI.TypeConvertor.toString(rs.get(0));
                        var caption = YIUI.TypeConvertor.toString(rs.get(1));
                        var item = {
                            value,
                            caption,
                        };
                        items.push(item);
                    }
                }
            } else if ($.isArray(rs)) {
                items = items.concat(rs);
            }
        }

        return items;
    },
    async getQueryItems(form, meta, cxt) {
        var queryParas = meta.queryParas || [];
        var data = {}, type;
        data.formKey = form.getFormKey();
        data.fieldKey = meta.key;
        data.typeDefKey = meta.typeDefKey;
        data.queryIndex = 0;
        data.service = 'ComboBoxService';
        data.cmd = 'getQueryItems';

        var sourceType, value, paras = [];
        for (var i = 0, len = queryParas.length; i < len; i++) {
            sourceType = queryParas[i].sourceType;
            value = queryParas[i].value;
            switch (sourceType) {
                case YIUI.COMBOBOX_PARAMETERSOURCETYPE.CONST:
                    break;
                case YIUI.COMBOBOX_PARAMETERSOURCETYPE.FORMULA:
                case YIUI.COMBOBOX_PARAMETERSOURCETYPE.FIELD:
                    value = await form.evalFormula(value, cxt, null, true);
                    break;
            }
            if (value instanceof Date) {
                value = value.getTime();
            }
            paras.push(value);
        }
        data.paras = $.toJSON(paras);

        return await Svr.Request.getData(data);
    },
    async calcDependentKey(form, meta, cxt) {
        var sourceType = meta.sourceType || YIUI.COMBOBOX_SOURCETYPE.ITEMS;

        if (sourceType == YIUI.COMBOBOX_SOURCETYPE.FORMULA
            || sourceType == YIUI.COMBOBOX_SOURCETYPE.QUERY) {
            const dependency = meta.dependency;

            if (dependency) {
                var data = {};
                var fields = dependency.split(","), v, field;

                for (var i = 0; i < fields.length; i++) {
                    field = fields[i];
                    v = await form.eval(field, cxt, null);
                    data[field] = v;
                }

                data.key = meta.key;
                data.formKey = form.getFormKey();
                return objecthash(data);
            }
        }
        return null;
    },
    async getComboboxItems(force, cxt) {
        const meta = this.getMetaObj();
        let form = YIUI.FormStack.getForm(this.ofFormID);
        let data = null;
        let localCxt = cxt;
        if (localCxt == null) {
            localCxt = new View.Context(form);
        }
        let currentDependentKey = null;
        const sourceType = meta.sourceType || this.sourceType || YIUI.COMBOBOX_SOURCETYPE.ITEMS;
        if (this.items && this.items.length > 0 && !force && sourceType === YIUI.COMBOBOX_SOURCETYPE.ITEMS)
            return this.items;
        if (this.items && this.items.length > 0 && (!this.needRebuild || !form.hasRelation(this.key))) {
            return this.items;
        }
        switch (sourceType) {
            case YIUI.COMBOBOX_SOURCETYPE.ITEMS:
            case YIUI.COMBOBOX_SOURCETYPE.STATUS:
            case YIUI.COMBOBOX_SOURCETYPE.PARAGROUP:
                this.needRebuild = false;
                return meta.items || this.items;
            case YIUI.COMBOBOX_SOURCETYPE.FORMULA:
                console.log('combobox formula');
                currentDependentKey = await this.calcDependentKey(form, meta, localCxt);
                if (this.itemCache[currentDependentKey]) {
                    return this.itemCache[currentDependentKey];
                }
                data = await this.getFormulaItems(form, meta.formula ? meta : this, localCxt);
                this.itemCache[currentDependentKey] = data;
                this.needRebuild = false;
                return data;
            case YIUI.COMBOBOX_SOURCETYPE.QUERY:
                console.log('combobox query');
                currentDependentKey = await this.calcDependentKey(form, meta, localCxt);
                if (this.itemCache[currentDependentKey]) {
                    return this.itemCache[currentDependentKey];
                }
                data = await this.getQueryItems(form, meta, localCxt);
                this.itemCache[currentDependentKey] = data;
                this.needRebuild = false;
                return data;
            default:
        }
        return null;
    },
});
YIUI.reg('combobox', ComboboxEditor);
YIUI.reg('checklistbox', ComboboxEditor);
YIUI.reg('segmentedcontrol', ComboboxEditor);
regControlType(YIUI.CONTROLTYPE.COMBOBOX, 'combobox');
regControlType(YIUI.CONTROLTYPE.CHECKLISTBOX, 'checklistbox');
regControlType(YIUI.CONTROLTYPE.SEGMENTEDCONTROL, 'segmentedcontrol');
export default ComboboxEditor;
