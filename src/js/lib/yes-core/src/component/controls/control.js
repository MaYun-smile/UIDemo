/*
 * @Author: gmf
 * @Date:   2016-03-15 16:08:17
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 15:43:20
 */

import { YIUI } from '../../YIUI-base';
import { DataType } from '../../YIUI-common';
import '../../YIUI-svr';
import { View } from '../../YIUI-parser';
import YIUIComponent from '../component';
import Immutable from 'immutable';
import Decimal from 'decimal.js';

YIUI.Control = YIUI.extend(YIUIComponent, {
    /**
     * Object。
     * 组件存储到数据库的值，区别于text。
     */
    value: '',
    /**
     * String。
     * 组件显示在界面上的文本，区别于value。
     */
    text: '',
    /**
     * String。
     * 组件值的需要满足的条件。
     */
    checkRule: null,
    /**
     * String。
     * 组件值变化时，需要执行的操作。
     */
    trigger: null,
    /**
     * 组件的事件处理对象
     */
    handler: YIUI.Handler,
    async setValue(v, commit = true, fireEvent) {
        const value = (v != null ? (v.value != null ? v.value : v) : null);
        const state = this.getState();
        await this.setInnerValue(value);
        if (!Immutable.is(this.getState(), state)) {
            const form = YIUI.FormStack.getForm(this.ofFormID);
            // setTimeout(async () =>
                await form.doValueChanged(this, this.getValue(), commit, fireEvent);
                // , 0);
        }
    },
    convertValue(v) {
        return v;
    },
    setInnerValue(v) {
        const state = this.state.set('value', this.convertValue(v));
        this.changeState(state);
    },
    getValue() {
        return this.state.get('value');
    },
    isNull() {
        return !this.getValue();
    },
    async doOnClick() {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        var cxt = new View.Context(form);
        const script = this.clickContent || this.getMetaObj().onClick;
        if (script) {
            // requestAnimationFrame(() => {
            await form.eval(script, cxt, null);
            // });
        }
    },
    getMaster(yigoid) {
        return yigoid;
    },
    convertValue: function (value, type) {
        var ret;
        switch (type) {
            case DataType.STRING:
                if (value == null || value == undefined) {
                    ret = '';
                } else {
                    ret = '' + value;
                }
                break;
            case DataType.INT:
            case DataType.LONG:
            case DataType.DOUBLE:
            case DataType.FLOAT:
            case DataType.NUMERIC:
                if (value == undefined || value == null || value == '') {
                    ret = 0;
                } else {
                    if (value.toString().toLowerCase() == "true") value = 1;
                    if (value.toString().toLowerCase() == "false") value = 0;
                    ret = new Decimal(value, 10);
                }
                break;
            case DataType.BOOLEAN:
                ret = value ? true : false;
                break;
            // case DataType.DATETIME:
            // case DataType.DATE:
            //     if(value instanceof Date){
            //         ret = value.getTime();
            //     }else{
            //         ret = null;
            //     }
            //     break;
            default:
                ret = value;
        }
        return ret;
    },
});
YIUI.reg('control', YIUI.Control);
export default YIUI.Control;
