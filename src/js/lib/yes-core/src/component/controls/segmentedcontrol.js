import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import { DataDef } from '../../YIUI-common';
import Svr from '../../YIUI-svr';
import { View } from '../../YIUI-parser';
import { regControlType } from './controlUtil';
import { lodash as $ } from 'yes-common';

const SegmentedControl = YIUI.extend(BaseControl, {
    async init(options) {
        this.base(options);
        this.metaObj.items = await this.getSegmentedItems();
    },
    async getFormulaItems(meta) {
        let items = [], formula = meta.formula;
        if (formula) {
            let newFormula = formula.substring(1, formula.length - 1).split(";") //去掉首尾的"号，同时以;将字符串分成数组
            for (var i = 0; i < newFormula.length; i++) {
                let newFormulaV = newFormula[i].split(",");
                items[i] = { caption: newFormulaV[1], value: newFormulaV[0], key: String(i + 1) }
            }
        }
        console.log(items);
        return items;
    },
    async getQueryItems(meta) {
        var queryParas = meta.queryParas || [];
        var data = {};
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
                    value = await form.evalFormula(value, cxt, null);
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
    async getSegmentedItems() {
        const meta = this.getMetaObj();
        const sourceType = meta.sourceType || YIUI.COMBOBOX_SOURCETYPE.ITEMS;
        if (this.items && this.items.length > 0)
            return this.items;
        switch (sourceType) {
            case YIUI.COMBOBOX_SOURCETYPE.ITEMS:
            case YIUI.COMBOBOX_SOURCETYPE.STATUS:
            case YIUI.COMBOBOX_SOURCETYPE.PARAGROUP:
                return meta.items;
            case YIUI.COMBOBOX_SOURCETYPE.FORMULA:
                return await this.getFormulaItems(meta);
            case YIUI.COMBOBOX_SOURCETYPE.QUERY:
                return await this.getQueryItems(meta);
            default:
        }
        return null;
    },
    dependedValueChange(targetField, field, v) {
        const state = this.state.set('value', v);
        this.changeState(state);
    }
});
YIUI.reg('segmentedcontrol', SegmentedControl);
regControlType(YIUI.CONTROLTYPE.SEGMENTEDCONTROL, 'segmentedcontrol');
export default SegmentedControl;