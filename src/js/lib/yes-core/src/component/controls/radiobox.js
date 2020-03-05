/*
 * @Author: gmf
 * @Date:   2016-03-18 10:50:14
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-20 13:52:06
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
import Immutable from 'immutable';
const Radiobox = YIUI.extend(BaseControl, {
    async init(options) {
        this.base(options);
        this.state = this.state.set('items', Immutable.fromJS([]));
        const metaValue = this.metaObj.metaValue;
        if (!metaValue) {
            this.metaObj.metaValue = !this.metaObj.metaValue
        }
    },
    // handler: YIUI.ButtonHandler,
    async calculateDisplayValue(v) {
        const { icon, selectedIcon } = this.getMetaObj();
        if (icon) {
            this.getMetaObj().icon = await YIUI.Base64ImageService.getBase64Image(icon, this.ofFormID);
        }
        if (selectedIcon) {
            this.getMetaObj().selectedIcon = await YIUI.Base64ImageService.getBase64Image(selectedIcon, this.ofFormID);
        }
        try {
            await this.resetItems();
            const itm = this.state.get('items').find((item) => item.get('value') == v);
            let text = itm ? itm.get('caption') : '';
            return text;
        } catch (ex) {
            console.log(ex);
            return '出错';
        }
    },
    async setInnerValue(v) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        if (!form) return
        const radios = form.getRadios(this.getMetaObj().groupKey);
        if (this.getMetaObj().groupKey) {
            radios.forEach((radio) => {
                radio.setNewValue(v);
            }, this);
        } else {
            radios.forEach((radio) => {
                if (this.metaObj.key == radio.key) {
                    radio.setNewValue(v);
                } else {
                    radio.setNewValue(!v);
                }
            }, this)
        }
    },
    setNewValue(v) {
        const state = this.state.set('value', v);
        this.changeState(state);
    },
    setVisible() {
        return;
    },
    getGroupKey() {
        return this.getMetaObj().groupKey;
    },
    async resetItems(trigger = true) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        if (!form) {
            return;
        }
        const radios = form.getRadios(this.getMetaObj().groupKey);
        const items = [];
        radios.forEach((radio) => {
            // if (radio.isVisible() && radio.isEnable()) {
            const enable = radio.isVisible() && radio.isEnable();
            const metaObj = radio.getMetaObj();
            items.push({
                value: metaObj.metaValue,
                caption: metaObj.caption,
                enable,
            });
            // }
        });
        const state = this.state.mergeDeepIn(['items'], Immutable.fromJS(items));
        this.changeState(state, trigger);
    },
});
YIUI.reg('radiobutton', Radiobox);
regControlType(YIUI.CONTROLTYPE.RADIOBUTTON, 'radiobutton');
export default Radiobox;

