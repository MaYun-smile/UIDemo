import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';

const Radiobox = YIUI.extend(BaseControl, {
    async calculateDisplayValue(v) {
        this.text = v || this.caption;
        return this.text;
    },
    getGroupKey() {
        return this.getMetaObj().groupKey;
    },
    setInnerValue(v) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        if (!form) {
            return;
        }
        const radios = form.getRadios(this.getMetaObj().groupKey);
        radios.forEach((radio) => {
            radio.rawSetValue(v);
        }, this);
    },
    rawSetValue(v) {
        const state = this.state.set('value', v);
        this.changeState(state);
    },
    getMaster(yigoid) {
        return this.master || this.calculateMaster();
    },
    calculateMaster() {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        if (!form) {
            return;
        }
        const radios = form.getRadios(this.getMetaObj().groupKey);
        const masterRadio = radios.find((radio) => {
            return radio.getMetaObj().isGroupHead;
        });
        this.master = masterRadio.getMetaObj().key;
        return this.master;
    },
});
YIUI.reg('radiobutton', Radiobox);
regControlType(YIUI.CONTROLTYPE.RADIOBUTTON, 'radiobutton');
export default Radiobox;
