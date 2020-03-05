import '../../YIUI-common';
import Base64 from 'base-64';
import Svr from '../../YIUI-svr';
import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import { View } from '../../YIUI-parser';
import { regControlType } from './controlUtil';

const ValidateBox = YIUI.extend(BaseControl, {
    init: async function (options) {
        this.base(options);
        const dataBinding = this.getMetaObj().dataBinding;
        if (dataBinding && dataBinding.checkRule) {
            this.state = this.state.set('checkRule', false)
        }
        await this.getValidateImage();
    },
    async calculateDisplayValue(v) {
        const { icon, preIcon, dataBinding } = this.getMetaObj();
        if (icon) {
            this.getMetaObj().icon = await this.getBase64Image(icon);
        }
        if (preIcon) {
            this.getMetaObj().preIcon = await this.getBase64Image(preIcon);
        }
        if (dataBinding && dataBinding.requiredIcon) {
            this.getMetaObj().requireIcon = await this.getBase64Image(dataBinding.requiredIcon);
        }
        return v
    },
    getBase64Image: async function (image) {
        return await YIUI.Base64ImageService.getBase64Image(image, this.ofFormID);
    },
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
            if (dataBinding.required) {
                let flag = String(v).length > 0 ? false : true;
                this.changeState(this.state.set("required", flag))
            }
        }
    },
    //验证码后台获取
    getValidateImage: async function () {
        let tmpClientID_paras = {
            service: "Authenticate",
            cmd: "CreateTempClientID",
        };
        let tmpClientID = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, tmpClientID_paras);
        let data = {
            service: "Authenticate",
            cmd: 'QueryValidateImage',
            tmpClientID: tmpClientID,
            width: 0,
            height: 0,
            validateId: new Date().getTime()
        };
        let image = await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data);
        var strData = Base64.decode(String(image.result).replace(/\s+/g, ""));
        let imageUrl = `data:image/png;base64,${window.btoa(strData)}`
        const state = this.state.set('validateImage', imageUrl);
        this.changeState(state);
    }
});
YIUI.reg('validatebox', ValidateBox);
regControlType(YIUI.CONTROLTYPE.VALIDATEBOX, 'validatebox');
export default ValidateBox;
