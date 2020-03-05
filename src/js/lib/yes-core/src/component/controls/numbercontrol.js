/*
 * @Author: gmf
 * @Date:   2016-05-03 11:17:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-05-03 11:20:02
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
import Decimal from 'decimal.js';
import { View } from '../../YIUI-parser';

const NumberEditor = YIUI.extend(BaseControl, {
    // handler: YIUI.NumberEditorHandler,
    numberValue: "",
    async init(options) {
        if (this.caption) {
            this.text = this.caption;
        }
        this.base(options);
        const dataBinding = this.getMetaObj().dataBinding;
        if (dataBinding && dataBinding.checkRule) {
            this.state = this.state.set('checkRule', false)
        }
    },

    getBase64Image: async function (image) {
        return await YIUI.Base64ImageService.getBase64Image(image, this.ofFormID);
    },

    setInnerValue: async function (v) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const dataBinding = this.getMetaObj().dataBinding;
        const cxt = new View.Context(form);
        this.changeState(this.state.set('value', v));
        if (dataBinding) {
            if (dataBinding.checkRule) {
                let script = dataBinding.checkRule;
                let flag = await form.eval(script, cxt, null);
                if (flag) {
                    if (dataBinding.checkRulePassIcon) {
                        this.getMetaObj().checkRuleIcon = await this.getBase64Image(dataBinding.checkRulePassIcon)
                    }
                } else {
                    if (dataBinding.checkRuleErrorIcon) {
                        this.getMetaObj().checkRuleIcon = await this.getBase64Image(dataBinding.checkRuleErrorIcon)
                    }
                }
                this.changeState(this.state.set('checkRule', flag));
            }
            // 当required的时候,设置为必填,如果输入有值,则不显示必填图标,如果没值则显示
            if (dataBinding.required) {
                let flag = String(v).length > 0 ? false : true;
                this.changeState(this.state.set("required", flag))
            }
        }
    },

    async calculateDisplayValue(v) {
        let { scale = 2, useSeparator, precision, roundingMode, formatStyle,
            stripTrailingZeros, format, icon, preIcon, dataBinding } = this.getMetaObj();
        if (icon) {
            this.getMetaObj().icon = await this.getBase64Image(icon);
        }
        if (preIcon) {
            this.getMetaObj().preIcon = await this.getBase64Image(preIcon);
        }
        if (dataBinding && dataBinding.requiredIcon) {
            this.getMetaObj().requireIcon = await this.getBase64Image(dataBinding.requiredIcon);
        }
        if (!v) return v;
        if (format) { return v }
        let dt = v;
        //精度,整数位数显示几位数,保留前多少位数
        if (precision && precision !== -1) {
            v = v.split(".")[1] ? v.split(".")[0].slice(0, precision) + "." + v.split(".")[1] :
                v.split(".")[0].slice(0, precision);
        }
        if (!(v instanceof Decimal)) {
            dt = new Decimal(v);
        }
        //去除末尾多余的0
        if (stripTrailingZeros) {
            return parseFloat(v).toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        }
        //小数点第三位进行舍入操作
        if (roundingMode != null) {
            let value = this.setRoundingMode(dt, scale, String(roundingMode));
            return value.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        }
        //显示文本格式化类型操作
        if (formatStyle) {
            return this.setFormatValue(dt, scale, formatStyle)
        }
        //不需要分割符
        if (useSeparator != null) {
            return dt.toFixed(scale)
        }
        //不限小数位
        if (scale === -1) {
            return dt.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        //整数部分每三位数增加一个小数点
        return dt.toFixed(scale).toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    //显示文本格式化类型操作
    setFormatValue: function (dt, scale, formatStyle) {
        let value;
        switch (formatStyle) {
            case 'PercentStyle': //百分比 
                value = (parseFloat(dt) * 100).toString().replace(/(?=(\B)(\d{3})+$)/g, ",") + "%"
                break;
            case 'DollarStyle':  //美元
                value = '$' + dt.toFixed(scale).toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");;
                break;
            case 'RMBStyle':    //人民币
                value = '¥' + dt.toFixed(scale).toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                break;
            default:
                value = dt.toFixed(scale).toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        return value
    },
    //小数点第三位进行舍入操作
    setRoundingMode: function (dt, scale, roundingMode) {
        let n = Math.pow(10, scale);
        let value;
        switch (roundingMode) {
            case '0': //向大值舍入
                value = Math.ceil(dt * n) / n;
                break;
            case '1'://向小值舍入
                value = Math.floor(dt * n) / n;
                break;
            case '2'://向右值舍入
                value = Math.ceil(dt * n) / n;
                break;
            case '3': //向左值舍入
                value = Math.floor(dt * n) / n;
                break;
            default:
                value = dt;
        }
        return value
    },
    isNull() {
        const v = this.getValue();
        if (v) {
            if (v instanceof Decimal) {
                return v.isZero();
            }
            return !v;
        }
        return true;
    },
    //不需要提交数据
    onTextChange: async function ({ value }) {
        const { zeroString, dataBinding } = this.getMetaObj();
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const cxt = new View.Context(form);
        if (dataBinding && dataBinding.textChanged) {
            this.numberValue = value;
            //当出现0值时,显示123
            if (zeroString && value === "0") {
                this.numberValue = zeroString
            }
            let script = dataBinding.textChanged;
            await form.eval(script, cxt, null);
        }
    },
    getText() {
        // 判断textChanged
        if (this.getMetaObj().dataBinding && this.getMetaObj().dataBinding.textChanged) {
            return this.numberValue
        }
        if (this.value instanceof Decimal) {
            return this.value.toNumber();
        }
        return this.value;
    }

});
YIUI.reg('numbereditor', NumberEditor);
YIUI.reg('numberinfoeditor', NumberEditor);
regControlType(YIUI.CONTROLTYPE.NUMBEREDITOR, 'numbereditor');
regControlType(YIUI.CONTROLTYPE.NUMBERINFOEDITOR, 'numberinfoeditor');
export default NumberEditor;
