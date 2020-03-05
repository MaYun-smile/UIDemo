/*
 * @Author: gmf
 * @Date:   2016-03-18 10:47:19
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-17 17:04:07
 */

import BaseControl from './control';
import cache from '../../cache';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
const { DictCache } = cache.current;
const DictEditor = YIUI.extend(BaseControl, {
    value: null,
    handler: YIUI.DictHandler,
    needRebuild: true,
    setInnerValue(v) {
        if (v === null || v == '') {
            v = null;
        }
        const state = this.state.set('value', v);
        this.changeState(state);
    },
    calculateDisplayValue: async function (v) { // eslint-disable-line object-shorthand
        if (!v) {
            return '';
        }
        const getValue = async (v) => {
            const dictKey = `${this.itemKey}.${v}`;
            const dictItem = await DictCache.get(dictKey);
            if (!dictItem) {
                return '';
            }
            const text = dictItem.caption;
            return text;
        };
        // 可能多选
        if (v && v.split) {
            const vArr = v.split(',');
            if (vArr.length > 1) {
                const textArr = [];
                for (const item of vArr) {
                    const text = await getValue(item);
                    textArr.push(text);
                }
                return textArr.join(', ');
            }
        }
        return await getValue(v);
    },
    init(options) {
        this.base(options);
        this.dictFilter = this.dictFilter || this.getMetaObj().dictFilter;
        this.itemKey = this.itemKey || this.getMetaObj().itemKey;
        this.state = this.state.merge({
            dictFilter: this.dictFilter,
            itemKey: this.itemKey,
        });
    },
    setDictInfo(itemKey, dictFilter) {
        const state = this.state.merge({
            dictFilter,
            itemKey,
        });
        this.changeState(state);
    },
    dependedValueChange(targetField, field, v) {
        const state = this.state.set('value', v);
        this.changeState(state);
    },
});
YIUI.reg('dict', DictEditor);
YIUI.reg('compdict', DictEditor);
YIUI.reg('dynamicdict', DictEditor);
regControlType(YIUI.CONTROLTYPE.DICT, 'dict');
regControlType(YIUI.CONTROLTYPE.COMPDICT, 'compdict');
regControlType(YIUI.CONTROLTYPE.DYNAMICDICT, 'dynamicdict');
export default DictEditor;
