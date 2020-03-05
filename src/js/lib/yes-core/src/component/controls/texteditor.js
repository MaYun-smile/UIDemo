/*
 * @Author: gmf
 * @Date:   2016-03-17 15:14:27
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 15:43:30
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';
import '../../YIUI-common';
import { View } from '../../YIUI-parser';
import { regControlType } from './controlUtil';
const TextEditor = YIUI.extend(BaseControl, {
    textValue: "",
    async init(options) {
        if (this.caption) {
            this.text = this.caption;
        }
        this.base(options);
        const dataBinding = this.getMetaObj().dataBinding;
        //checkRule匹配特殊字符
        if (dataBinding && dataBinding.checkRule) {
            this.state = this.state.set('checkRule', false)
        }
    },
    //默认显示image
    calculateDisplayValue: async function (v) {
        const { icon, preIcon, dataBinding } = this.getMetaObj();
        if (icon) {
            this.getMetaObj().icon = await this.getBase64Image(icon);
        }
        if (preIcon) {
            this.getMetaObj().preIcon = await this.getBase64Image(preIcon);
        }
        //这里只要有这个required,不需要改变,控件有这个值就需要这个
        if (dataBinding && dataBinding.requiredIcon) {
            this.getMetaObj().requireIcon = await this.getBase64Image(dataBinding.requiredIcon);
        }
        return v
    },
    //所有图片需要请求服务器地址
    getBase64Image: async function (image) {
        return await YIUI.Base64ImageService.getBase64Image(image, this.ofFormID);
    },
    //重载setInnerValue 文本监听使用
    setInnerValue: async function (v) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const dataBinding = this.getMetaObj().dataBinding;
        let cxt = new View.Context(form);
        this.changeState(this.state.set('value', v));
        if (dataBinding) {
            if (dataBinding.checkRule) {
                let script = dataBinding.checkRule;
                let flag = await form.eval(script, cxt, null);
                if (flag) {
                    if (dataBinding.checkRulePassIcon) {
                        this.getMetaObj().checkRuleIcon = await this.getBase64Image(dataBinding.checkRulePassIcon);
                    }
                } else {
                    if (dataBinding.checkRuleErrorIcon) {
                        this.getMetaObj().checkRuleIcon = await this.getBase64Image(dataBinding.checkRuleErrorIcon);
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
    //不需要提交数据
    onTextChange: async function (v) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const dataBinding = this.getMetaObj().dataBinding;
        let cxt = new View.Context(form);
        if (dataBinding) {
            if (dataBinding.textChanged) {
                this.textValue = v.value
                let script = dataBinding.textChanged;
                await form.eval(script, cxt, null);
            }
        }
    },
    // handler: YIUI.TextEditorHandler,
    getText() {
        if (this.getMetaObj().dataBinding && this.getMetaObj().dataBinding.textChanged) {
            return this.textValue
        }
        return this.getValue();
    },
});
YIUI.reg('texteditor', TextEditor);
YIUI.reg('passwordeditor', TextEditor);
// 掩码控件也以文字输入框实现
YIUI.reg('maskeditor', TextEditor);
regControlType(YIUI.CONTROLTYPE.TEXTEDITOR, 'texteditor');
regControlType(YIUI.CONTROLTYPE.MASKEDITOR, 'maskeditor');
regControlType(YIUI.CONTROLTYPE.PASSWORDEDITOR, 'passwordeditor');
export default TextEditor;
